# 代码最佳实践汇总 - 组件篇

## 配置组件

## 日志组件

## MySQL

### gorm model定义

- gorm的model的字段的定义，尽量用 golang 原生的基本类型

### gorm方法换行

- gorm每个方法调用后换行，看着比较清晰

TODO: 补充demo

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
