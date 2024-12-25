---
id: language
title: 代码最佳实践 - 组件篇
description: 代码最佳实践 - 组件篇
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /best-practices/components
---

## 配置组件

## 日志组件

## MySQL

### gorm model定义

- gorm的model的字段的定义，尽量用 golang 原生的基本类型

### gorm方法换行

- gorm每个方法调用后换行，看着比较清晰

```go
user := query.User
users, err := user.WithContext(ctx).
	Select(user.ID, user.Username, user.Age).
	Where(user.ID.Eq(uid)).
	Find()
```

### SQL列表查询优先使用in关键字

用gorm编写query的查询条件，当某个查询条件是列表时，应当优先采用in关键字，而不是拼接多个or关键字

```go
// good case
// IN
db.Where("user_id in ?", []int64{123, 456}).Find(&users)
// SELECT * FROM users WHERE user_id IN (123, 456);
```

### dal/dao 层模糊查询写法 

- GORM 的查询并没有专门的模糊查询方法，需要自己传入的时候拼接%，形如 `%xx%`
- 使用 `"%" + str + "%"` 而不是 `fmt.Spinrtf("%%%s%%", str)`

```go
// good case
db.Where("username LIKE ?", "%" + str + "%").Find(&users)

// bad case
db.Where("username LIKE ?", fmt.Sprintf("%%%s%%", str)).Find(&users)
```

### gorm 读写分离

- 在RDS的使用中， `gorm v2` 支持读写分离，写入 `DB` 后立刻读取，大概率会出现读失败（同步延迟）。在读写分离场景下，对一致性敏感的场景，可以显示指定读的节点为主节点（master）
- `GORM V2` 提供了多数据库及读写分离等的支持，复杂配置请参考 https://gorm.io/docs/dbresolver.html

### gorm 事务

- 常见的事务设计在进入事务临界区后，只有commit或rollback才会释放事务锁。
- 在代码中如果对异常场景遗漏了rollback，可能会导致事务锁无法释放。gorm v2 推荐使用Transaction代替Begin/Rollback，通过 Begin, Commit, Rollback 来管理事务极易因为过早 return 等问题导致事务未正常处理。
- 在代码逻辑中未能正确commit，也会导致事务锁无法释放。
- 在数据库中，事务锁直到关闭数据库连接或连接超时时候才会把对应事务回滚， 而大量的无法释放的事务锁会导致数据库链接雪崩。

#### rollback必须要覆盖所有异常场景

```go
// good case 1 (推荐)
// 推荐使用Transaction方式来管理事务，由于手动调用 Commit 和 Rollback
q := query.Use(db)

q.Transaction(func(tx *query.Query) error {
  if _, err := tx.User.WithContext(ctx).Where(tx.User.ID.Eq(100)).Delete(); err != nil {
    return err
  }
  if _, err := tx.Article.WithContext(ctx).Create(&model.User{Name:"modi"}); err != nil {
    return err
  }
  return nil
})

// good case 2
q := query.Use(db)

func doSomething(ctx context.Context, users ...*model.User) (err error) {
    tx := q.Begin()
    defer func() {
        if r := recover(); r != nil {
            _ = tx.Rollback()
        }
        if err != nil {
            _ = tx.Rollback()
        }
    }()

    err = tx.User.WithContext(ctx).Create(users...)
    if err != nil {
        return
    }

    // ...

    return tx.Commit()
}

// bad case
q := query.Use(db)

func doSomething(ctx context.Context, users ...*model.User) (err error) {
    tx := q.Begin()
    defer func() {
        if r := recover(); r != nil {
            _ = tx.Rollback()
        }
        // 没有下面的 Rollback，其他地方也没有对非nil的err进行处理
        //if err != nil {
        //    _ = tx.Rollback()
        // }
    }()

    err = tx.User.WithContext(ctx).Create(users...)
    if err != nil {
        return
    }

    // ...

    return tx.Commit()
}
```

> 参看官方文档：
> https://gorm.io/gen/transaction.html  
> https://gorm.io/docs/transactions.html  

### 安全优雅的执行复杂 SQL

开发过程中大部分简单的查询我们可以使用 ORM 的基础方法组合 (例如 `Where`、`Order`、`Group` 组合等)，
但是一些复杂的操作还是直接使用定制的复杂 `SQL` 更加方便。

手写可能带来的问题：

1. 大量零值逻辑判断、条件 check检查散落在各处，不整洁，可维护性差
2. 最重要的，SQL拼接很容易导致安全风险，导致 SQL 注入等安全漏洞

#### 复杂的逻辑判断

场景：在管理后台进行查询操作时候，可能需要对参数做一些复杂的逻辑判断，除了非零的判断外，还可能需要判断多种状态。  
由于参数不确定安全性上很难做安全预编译，如果直接字符串拼接到SQL就可能引起SQL注入。

```go
// 定义查询条件结构体
type SearchCondition struct {
   UserID         int64
   Username       string
   Phone          string
   Email          string
   Level          int
   Status         int
   CreatedAtGte   time.Time
   CreatedAtLte   time.Time
   OrderBy        string
}

// {{}} 里面是用go模板的语法编写的，然后就可以用go的语法进行编码了，比如：strings.ToLower 或 cond.CreatedAtGte.IsZero
type Search interface {
    //select * from @@table
    //    {{where}}
    //        {{if cond.UserID > 0}} id = @cond.UserID {{end}}
    //        {{if cond.Username != ""}} and username like concat('%',@cond.Username,'%') {{end}}
    //        {{if cond.Phone != ""}} and phone=@cond.Phone {{end}}
    //        {{if cond.Email != ""}} and email=@cond.Email {{end}}
    //        {{if cond.Level > 0 && cond.Level < 10}} and level = @cond.Level {{end}}
    //        {{if cond.Status > 0}} id = @cond.Status {{end}}
    //        {{if cond.CreatedAtGte.IsZero()}} and created_at >=@cond.CreatedAtGte {{end}}
    //        {{if cond.CreatedAtLte.IsZero()}} and created_at <=@cond.CreatedAtLte {{end}}
    //    {{end}}    
    //    {{if cond.OrderBy == "created_at" }}
    //        order by @@cond.OrderBy
    //    {{else}}
    //        order by id desc
    //    {{end}}
   SearchByConditions(cond SearchCondition) ([]*gen.T, error)
}

// 生成代码
// cmd/gen/generate.go
...
func main() {
    g := bytedgen.NewGenerator(gen.Config{
        OutPath: "../internal/dal/db/dao",
    })
    g.UseDB(db)
    
    // 将 search 自定义的方法附加到 User 上
    g.ApplyInterface(func(Search) {}, model.User{})
    
    g.Execute()
}      

// 生成的Go代码参考如下：

// select * from @@table
//
//	{{where}}
//	    {{if cond.UserID > 0}} id = @cond.UserID {{end}}
//	    {{if cond.Username != ""}} and username like concat('%',@cond.Username,'%') {{end}}
//	    {{if cond.Phone != ""}} and phone=@cond.Phone {{end}}
//	    {{if cond.Email != ""}} and email=@cond.Email {{end}}
//	    {{if cond.Level > 0 && cond.Level < 10}} and level = @cond.Level {{end}}
//	    {{if cond.Status > 0}} id = @cond.Status {{end}}
//	    {{if cond.CreatedAtGte.IsZero()}} and created_at >=@cond.CreatedAtGte {{end}}
//	    {{if cond.CreatedAtLte.IsZero()}} and created_at <=@cond.CreatedAtLte {{end}}
//	{{end}}
//	{{if cond.OrderBy == "created_at" }}
//	    order by @@cond.OrderBy
//	{{else}}
//	    order by id desc
//	{{end}}
func (u userDo) SearchByConditions(cond method.SearchCondition) (result []*model.User, err error) {
	var params []interface{}

	var generateSQL strings.Builder
	generateSQL.WriteString("select * from users ")
	var whereSQL0 strings.Builder
	if cond.UserID > 0 {
		params = append(params, cond.UserID)
		whereSQL0.WriteString("id = ? ")
	}
	if cond.Username != "" {
		params = append(params, cond.Username)
		whereSQL0.WriteString("and username like concat('%',?,'%') ")
	}
	if cond.Phone != "" {
		params = append(params, cond.Phone)
		whereSQL0.WriteString("and phone=? ")
	}
	if cond.Email != "" {
		params = append(params, cond.Email)
		whereSQL0.WriteString("and email=? ")
	}
	if cond.Level > 0 && cond.Level < 10 {
		params = append(params, cond.Level)
		whereSQL0.WriteString("and level = ? ")
	}
	if cond.Status > 0 {
		params = append(params, cond.Status)
		whereSQL0.WriteString("id = ? ")
	}
	if cond.CreatedAtGte.IsZero() {
		params = append(params, cond.CreatedAtGte)
		whereSQL0.WriteString("and created_at >=? ")
	}
	if cond.CreatedAtLte.IsZero() {
		params = append(params, cond.CreatedAtLte)
		whereSQL0.WriteString("and created_at <=? ")
	}
	helper.JoinWhereBuilder(&generateSQL, whereSQL0)
	if cond.OrderBy == "created_at" {
		generateSQL.WriteString("order by " + u.Quote(cond.OrderBy) + " ")
	} else {
		generateSQL.WriteString("order by id desc ")
	}

	var executeSQL *gorm.DB
	executeSQL = u.UnderlyingDB().Raw(generateSQL.String(), params...).Find(&result) // ignore_security_alert
	err = executeSQL.Error

	return
}


// 查询时候只需要该调用函数即可：

// 从请求中获取值
var reqCondition = SearchCondition{
  UserID: c.GetInt("user_id"),
  Username: c.GetString("username"),
  Phone: c.GetString("phone"),
  Email: c.GetString("email"),
  CreatedAtGte: c.GetTime("created_at_gte"),
  OrderBy: c.GetString("created_at")
  ...
}

// 查询数据
result, err := query.User.SearchByConditions(reqCondition)
if err!= nil{
  //...
}
```

更多示例可以参看下面写法

```go
// internal/dal/db/method/method.go
// common method
type Method interface {
	//where(id=@id)
	FindByID(id int) (*gen.T, error)

	//sql(select * from users)
	FindAll() ([]gen.M, error)

	//sql(select * from users limit 1)
	FindOne() gen.M

	/*
		select * from @@table
		  {{where}}
				  id>0
		       {{if cond}}id=@id {{end}}
		       {{if key!="" && value != ""}} or @@key=@value{{end}}
		   {{end}}
	*/
	FindByIDOrCustom(cond bool, id int, key, value string) ([]*gen.T, error)
	// where clause

	// update @@table
	//	{{set}}
	//		update_time=now(),
	//		{{if name != ""}}
	//			name=@name
	//		{{end}}
	//	{{end}}
	//	{{where}}
	//		id=@id
	//	{{end}}
	UpdateName(name string, id int) error
	// Set clause if clause blend

}

// only for users
type UserMethod interface {
	//where(id=@id)
	FindByID(id int) (gen.T, error)

	//select * from users where age>18
	FindAdult() ([]gen.T, error)

	//Where("name=@name and age=@age")
	FindByNameAndAge(name string, age int) (*gen.T, error)
	//sql(select id,name,age from users where age>18)
	FindBySimpleName() ([]*gen.T, error)

	//sql(select id,name,age from @@table where age>18
	//{{if cond1}}and id=@id {{end}}
	//{{if name == ""}}and @@col=@name{{end}})
	FindByIDOrName(cond1 bool, id int, col, name string) (*gen.T, error)

	//sql(select address from users limit 1)
	FindAddress() (*gen.T, error)
	//simple query

	// select * from users where id=@id
	FindUserToMap(id int) (gen.M, error)
	// return to map[string]interface{}

	//select * from @@table
	//	{{where}}
	//		{{if role=="user"}}
	//			id=@id
	//		{{else if role=="admin"}}
	//			role="user" or rule="normal-admin"
	//		{{else}}
	//			role="user" or role="normal-admin" or role="admin"
	//		{{end}}
	//	{{end}}
	FindByRole(role string, id int)

	//update users
	//	{{set}}
	//		update_time=now(),
	//		{{if name != ""}}
	//			name=@name
	//		{{end}}
	//	{{end}}
	// where id=@id
	UpdateUserName(name string, id int) error

	//sql(insert into @@table (name,age) values (@name,@age) )
	InsertValue(age int, name string) error
	// execute only return error
}
```

> 更多写法可以参考官网：https://gorm.io/gen/

#### 多个 Struct 复用SQL逻辑

场景：有多个结构相同或者类似的数据表，如果需要通过相同的过滤逻辑，并且绑定到不同的结构体。可以通过 `GEN` 实现只写一遍查询逻辑。

```go
type CommonSearch interface{    
    // 使用自定义字段
    // FindByCustomKey select by custom key
    //
    // select * from @@table 
    // {{where}}
    //     @@key = @value
    // {{end}}
    FindByCustomKey(key,value string)([]*gen.T,error)
    
    //....
}

// 根据特定状态字段查询
type StatusSearch interface {
    // FindByStatus select by status
    //
    // select * from @@table 
    // {{where}}
    //     status = @value
    // {{end}}
    FindByStatus(value string)([]*gen.T, error)
}

// 根据创建时间范围查询
type TimeRangeSearch interface {
    // FindByTimeRange select by time range
    //
    // select * from @@table 
    // {{where}}
    //     created_at >= @startTime AND created_at <= @endTime
    // {{end}}
    FindByTimeRange(startTime, endTime time.Time)([]gen.T, error)
}

// 根据特定编号查询
type IDSearch interface {
    // FindByID select by ID
    //
    // select * from @@table 
    // {{where}}
    //     id = @value
    // {{end}}
    FindByID(value int)([]gen.T, error)
}

// 以上只是举例，也可以将其合并为一个，或者将多个不同的的条件应用到不同的对象结构体

// 代码生成
func main() {
    g := bytedgen.NewGenerator(gen.Config{
        OutPath: "../internal/db/dal/dao", 
    })
    g.UseDB(db)
    
    // 可以对多个表生成同一个查询接口，GEN会对所有表生成的结构体绑定查询方法
    g.ApplyInterface(func(CommonSearch){}, model.User{}, model.Post{})
    g.ApplyInterface(func(StatusSearch){}, model.Order{}, model.Task{})
    g.ApplyInterface(func(TimeRangeSearch){}, model.Event{}, model.Log{})
    g.ApplyInterface(func(IDSearch){}, model.Product{}, model.Category{})
    
    g.Execute()
}


// 代码中进行查询,查询传入的参数不需要单独做安全处理
// GEN会自动帮字段名和数据都做安全处理，确保没有SQL注入漏洞

users, err := query.User.FindByCustomKey("username","eagle")
posts, err := query.Post.FindByCustomKey("username","eagle-bot")

orders, err := query.Order.FindByStatus("pending")
tasks, err := query.Task.FindByStatus("in_progress")

events, err := query.Event.FindByTimeRange(time.Now().Add(-24*time.Hour), time.Now())
logs, err := query.Log.FindByTimeRange(time.Date(2024, 11, 1, 0, 0, 0, 0, time.UTC), time.Date(2024, 11, 8, 0, 0, 0, 0, time.UTC))

products, err := query.Product.FindByID(123)
categories, err := query.Category.FindByID(456)
```

## Cache

### 热key失效引起穿透

- 缓存失效时，回源数据要考虑下游保护（例如使用singleflight+多级缓存等），防御穿透的解决方法。
  - 多级缓存
  - 过期时间随机浮动
  - 使用redis分布式锁

> https://pkg.go.dev/golang.org/x/sync/singleflight

```go
// bad case
// 缓存穿透
func GetProduct(porductId int64) string{
    key := GenerateKey(porductId)
    item := ReadCache(key)
    if item == "" {
        // 缓存失效 查询DB或者rpc调用
        item = GetProductByID(porductId)
    }
    WriteCache(key, item)
    return item
}

// 方法中在读取缓存失效后，会触发数据回源，然后重新写缓存。这是符合我们通常认知的处理思路，但是在实际业务中，
// 尤其是key如果是热key，会在失效时，大量的请求穿透到下游的服务或者DB，有可能直接打垮下游服务。
// 如果调用RPC中逻辑复杂，甚至请求多处依赖的话，如果没有回源保护，可能导致雪崩。

// good case

```

## 分布式锁

- 使用Redis SetNX 获取分布式，使用 random.Int() 做为value，避免因为使用defer unlock 错误释放别人的锁

```go
// ------ good case ------
// 处理函数
func process() {
    val, err := Lock(ctx, uid)
    if err != nil {
        return fmt.Errorf("...")
    }
    defer UnLock(ctx, userId, val)
}

// 加锁
func Lock(ctx context.Context, uid int64) (int64, error) {
    key := fmt.Sprintf("lock:%d", uid)
    randVal = random.Int()
    lock, err := GetClient().SetNX(key, randVal, time.Second*3)
    if err != nil {
        return 0, err
    }
    if !lock {
        return 0, errors.New("failed to lock")
    }
    return randVal, nil
}

// 释放锁
func UnLock(ctx context.Context, uid, randVal int64) {
    key := fmt.Sprintf("lock:%d", uid)
    return GetClient().DelIfEqual(key, randVal)
}

// ------ bad case ------
// 未获得锁的情况下也会执行defer语法，会导致错误释放别人的锁，引发事故
// 处理函数
func process() {
    getLock := Lock(ctx, uid)
    defer UnLock(ctx, uid)
    if !getLock {
       return fmt.Errorf("...")
    }
}

// 加锁
func Lock(ctx context.Context, uid int64) {
    key := fmt.Sprintf("lock:%d", uid)
    return GetClient().SetNX(key, 1, time.Second*5)
}

// 释放锁
func UnLock(ctx context.Context, uid int64) {
    key := fmt.Sprintf("lock:%d", uid)
    return GetClient().Del(key)
}
```

## 单元测试

### 单测基本原则

单元测试基本原则 “FIRST”：

- FAST（快速）：单元测试应以最小单元快速运行验证
> 每个单元测试逻辑不应该太复杂，粒度要小
> 单个单元测试最好能在毫秒级完成，要考虑能否在几分钟内跑完所有单元测试。
- ISOLATED（隔离）：每个单元测试之间应独立，无互相依赖
> 一个单元测试结果不能依赖另外一个单元测试，比如查询类型的单元测试不应依赖上一个插入的单元测试成功
> 单独跑某一个单元测试不应影响结果。
- REPEATABLE（可重复）：单元测试在任意时间、任意人员执行结果需要一致
> 不能因为数据库等外部原因导致单元测试失败，这要求我们模拟（mock）所有外部依赖
> 确保写的单元测试不受执行环境、外部依赖（RPC/DB 等）影响结果。
- SELF-VALIDATING（可自我验证）：只打印日志的单元测试无任何意义
> 必须有断言（assert），使用工具排除无效单元测试
> 确保如果被测代码逻辑有问题，单元测试能 FAIL 拦截。
- TIMELY（及时）：应尽早写单元测试
> 提测后再补单元测试会导致单元测试无法起到应有的质量保障作用
> 在联调 / 提测前要确保代码经过单元测试验证

推荐组合：testing + mockey + goconvey

### 测试框架

测试基础框架

- testing，Go 语言官方自带的测试包，按照约定方式编写测试代码后，使用 go test 命令即可执行测试。参考：https://pkg.go.dev/testing

mock 库

- gomock，官方开发维护的测试框架，实现了较为完整的基于 interface 的 mock 功能，能够与 golang 内置的 testing 包良好集成，也能用于其他测试环境中。包含 gomock 包和 mockgen 工具两部分，- - gomock 包完成对桩对象生命周期的管理，mockgen 工具用来生成 interface 对应的 mock 类源文件。参考：https://github.com/golang/mock
- gomonkey：golang 的一款打桩框架，目标是让用户在单元测试中以低成本完成打桩，从而将精力聚焦于业务功能的开发。参考：https://github.com/agiledragon/gomonkey
- mockey：实现思想来自 java 的 mockito，是快速 mock 函数、方便单测的工具库，推荐结合 goconvey 使用。参考：https://github.com/bytedance/mockey

断言库

- goconvey，Github 上有 8000 星。开源库，提供丰富的断言功能和断言函数，并支持很多 Web 界面特性，采用函数式编程风格。参考：https://github.com/smartystreets/goconvey
- testify：Github 上有 21000 星。包含断言、suite、mock（不推荐使用 testify 的 mock），面向对象编程风格。参考：https://github.com/stretchr/testify

一个简单的demo

```go
import (
	. "github.com/bytedance/mockey"
    "github.com/smartystreets/goconvey/convey"
)

func Fun(a string) string {
   fmt.Println(a)
   return a
}

func TestXXX(t *testing.T) {
    PatchConvey("test return", t, func() {
       Mock(Fun).Return("c").Build()
       r := Fun("a")
       convey.So(r, convey.ShouldEqual, "c")
    })
}
```

多case情况

```go
// case
// 基于 mockey + convey 的单测示例
// mockey 可以使得 Mock 在 PatchConvey 内部生效，外部自动释放。
mockey.PatchConvey("test case", t, func() {
    mockey.PatchConvey("测试 return 1", func() {
        // mock 仅对区域生效
        mockey.Mock(Fun).Return("1").Build()
	convey.So(Fun(""), ShouldEqual, "1")
    })

    mockey.PatchConvey("测试 return 2", func() {
        // 覆盖 mock，仅对区域有效
        mockey.Mock(Fun).Return("2").Build()
        convey.So(Fun(""), ShouldEqual, "2")
    })

    mockey.PatchConvey("测试 return 3", func() {
        // 覆盖 mock，仅对区域有效
        mockey.Mock(Fun).Return("3").Build()
        convey.So(Fun(""), ShouldEqual, "3")
    })
    
})
// 这里没有 mock 生效，均已被自动 Un Patch
convey.So(Fun(""), ShouldEqual, "")
```

### 测试代码组织

测试代码常见组织模式有 `Arrange-Act-Assert` 和 `Given-When-Then` 两种，在 Go 语言工程实践中推荐 `Arrange-Act-Assert（AAA）` 作为测试代码组织模式，它将单元测试分为三个阶段：
- `Arrange（准备）`：设置测试的前提条件，包括创建对象、设置依赖关系、定义输入、MOCK 等。
- `Act（操作）`：执行要测试的行为，通常是调用一个函数或一个方法，并获取其返回值。
- `Assert（断言）`：验证测试的结果，通常是检查返回值或对象的状态，以确保它们符合预期。

```go
func TestParseGender(t *testing.T){
    mockey.PatchConvey("18 位身份证号女性", t, func(){
        // Arrange: 输入和预期的输出
        cardNo :="120100201802013691"
        expectGender := GenderFemale
        // Act: 调用被测函数
        resultGender := ParseGender(cardNo)
        // Assert: 检查结果是否符合预期
        convey.So(resultGender, convey.ShouldEqual, expectGender)
    })
    mockey.PatchConvey("18 位身份证号男性", t, func() {
	// ...
    })
}
```

#### Arrange-Act-Assert

```go
// case 1
// 计算两个数字之和的函数测试
package main

import "testing"

func addNumbers(a, b int) int {
    return a + b
}

func TestAddNumbers(t *testing.T) {
    // Arrange
    a := 3
    b := 5
    expected := 8
    // Act
    result := addNumbers(a, b)
    // Assert
    if result!= expected {
       t.Errorf("addNumbers(%d, %d) = %d; expected %d", a, b, result, expected)
    }
}

// case 2
// 判断字符串是否包含特定子串的函数测试
package main

import "testing"

func containsSubstring(str, substr string) bool {
    return len(str) > len(substr) && str[len(str)-len(substr):] == substr
}

func TestContainsSubstring(t *testing.T) {
    // Arrange
    str := "Hello, world!"
    substr := "world"
    expected := true
    // Act
    result := containsSubstring(str, substr)
    // Assert
    if result!= expected {
       t.Errorf("containsSubstring(%s, %s) = %t; expected %t", str, substr, result, expected)
    }
}
```

#### Given-When-Then

```go
// case 1
// 用户登录功能测试
package main

import "testing"

func login(username, password string) bool {
    // 假设这里有实际的登录逻辑，检查用户名和密码是否匹配数据库中的用户
    if username == "testuser" && password == "testpassword" {
       return true
    }
    return false
}

func TestLogin(t *testing.T) {
    // Given
    username := "testuser"
    password := "testpassword"
    // When
    result := login(username, password)
    // Then
    if!result {
       t.Errorf("login(%s, %s) should return true", username, password)
    }
}

// case 2
// 文件读取功能测试
package main

import "testing"

func readFile(filename string) string {
    // 假设这里有实际的文件读取逻辑
    return "Hello, this is a test file."
}

func TestReadFile(t *testing.T) {
    // Given
    filename := "test.txt"
    expectedContent := "Hello, this is a test file."
    // When
    result := readFile(filename)
    // Then
    if result!= expectedContent {
       t.Errorf("readFile(%s) = %s; expected %s", filename, result, expectedContent)
    }
}
```

### 无效单测

如果单测没有断言，则完全失去了写测试代码的意义，是无效的单测（写单测的目标不是覆盖率达标），需要避免

```go
// 无效单测示例：只打印日志，无断言，单测不会 FAIL
func TestDoSomeThing(t *testing.T) {
    PatchConvey("invalid test", t, func(){
       result := doSomeThing()
       logs.Info("doSomeThing result= %+v", result) //缺少 assert
    })
}
```

### 表驱动（Table-Driven）

- 只需准备多组数据，无需重复构造流程，代码少冗余少，写得快，结构清晰可读性强，更易扩展和可维护

```go
package main

import (
    "testing"

    "github.com/bytedance/mockey"
    "github.com/smartystreets/goconvey/convey"
)

/* 被测单元 */
func Add(x, y int) int {
    return x + y
}

/* 单元测试 */
func TestAddWithDataTable(t *testing.T) {
    // Arrange：准备输入和预期的输出
    type inputs struct {
       a int
       b int
    }
    tests := []struct {
       name     string
       args     inputs
       expected int
    }{
       {"0+0", inputs{0, 0}, 0},
       {"正数和", inputs{1, 2}, 3},
       {"正负和", inputs{-1, 1}, 0},
       {"负数和", inputs{-1, -1}, -2},
    }
    // 循环遍历，测试各种情况
    for _, tt := range tests {
       t.Run(tt.name, func(t *testing.T) {
          mockey.PatchConvey(tt.name, t, func() {
             // Act：调用被测函数
             result := Add(tt.args.a, tt.args.b)

             // Assert：检查结果是否符合预期
             convey.So(result, convey.ShouldEqual, tt.expected)
          })
       })
    }
}
```

1. tests定义测试数据，其中 name 定义了每个测试场景的名称。
2. 循环中，`t.Run()`执行每一个子测试，每个子测试使用 name 区分，若某个 case 报错，可快速定位和排查。
3. 该例子中，断言使用 `goconvey` 库中的 `convey.So()` 方法替代了 `t.Errorf()`。
  1. 特别地，`convey.So()` 必须位于 `convey.PatchConvey()` 中。

注意：Table-Driven 并非所有情况都适用。
1. 适用范围：针对同一函数或者方法，有众多相似的测试用例需要测试，尤其是输入和输出可以被清晰定义时。比如，对于数学函数、解析函数、格式化函数等的测试。
2. 不适用范围：当函数行为复杂、数据结构复杂时，每个测试用例可能需要不同的预设条件和断言，或独立的前置设置或后置清理。
