---
id: overview
title: 概览
description: Eagle 一套轻量级 Go 微服务框架，包含大量微服务相关框架及工具
keywords:
  - Go
  - Eagle
  - Toolkit
  - Framework
  - Microservices
  - HTTP
slug: /component/tracing/overview
---


## 为什么需要链路追踪

在微服务体系中，一次HTTP/RPC调用很可能涉及多个服务，每个服务内又可能调用其他的 HTTP API、MySQL、Redis等等，那如何知道是谁出了问题呢？又是在哪一个环节出了问题呢？如果使用日志来排查是可以做到，但是需要花费大量的时间，但是链路追踪可以帮助我们快速定位到问题所在。

## OpenTelemetry 标准

分布式链路跟踪（ `Distributed Tracing` ）的概念最早是由`Google`提出来的，发展至今技术已经比较成熟，也是有一些协议标准可以参考。目前在`Tracing`技术这块比较有影响力的是两大开源技术框架：Netflix公司开源的`OpenTracing`和Google开源的`OpenCensus`。两大框架都拥有比较高的开发者群体。为形成统一的技术标准，两大框架最终磨合成立了`OpenTelemetry`项目，简称`otel`。具体可以参考：

 - OpenTracing介绍
 - OpenTelemetry介绍

因此，我们的Tracing技术方案以 `OpenTelemetry` 为实施标准，协议标准的一些Golang实现开源项目：

[https://github.com/open-telemetry/opentelemetry-go](https://github.com/open-telemetry/opentelemetry-go)  
[https://github.com/open-telemetry/opentelemetry-go-contrib](https://github.com/open-telemetry/opentelemetry-go-contrib)
其他第三方的框架和系统（如Jaeger/Prometheus/Grafana等）也会按照标准化的规范来对接 `OpenTelemetry`，使得系统的开发和维护成本大大降低。

## 核心概念

我们先看看 `OpenTelemetry` 的架构图，我们这里不会完整介绍，只会介绍其中大家常用的几个概念。关于 `OpenTelemetry` 的内部技术架构设计介绍，可以参考 `OpenTelemetry` 架构 ，关于语义约定请参考：[https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/trace/api.md)

![opentelemetry_arch](/images/opentelemetry_arch.png)

### TracerProvider

主要负责创建 `Tracer`，一般是需要第三方的分布式链路跟踪管理平台提供具体的实现。默认情况是一个空的 `TracerProvider(NoopTracerProvider)`，虽然也能创建 `Tracer` 但是内部其实不会执行具体的数据流传输逻辑。举个例子，假如使用 `jaeger`，往往是这么来初始化并注入 `jaeger` 的`TracerProvider`：

```go
// InitTracerProvider returns an OpenTelemetry TracerProvider configured to use
// the Jaeger exporter that will send spans to the provided url. The returned
// TracerProvider will also use a Resource configured with all the information
// about the application.
func InitTracerProvider(serviceName, endpoint string, options ...Option) (*tracesdk.TracerProvider, error) {
	var endpointOption jaeger.EndpointOption
	if serviceName == "" {
		return nil, errors.New("no service name provided")
	}
	if strings.HasPrefix(endpoint, "http") {
		endpointOption = jaeger.WithCollectorEndpoint(jaeger.WithEndpoint(endpoint))
	} else {
		endpointOption = jaeger.WithAgentEndpoint(jaeger.WithAgentHost(endpoint))
	}

	// Create the Jaeger exporter
	exporter, err := jaeger.New(endpointOption)
	if err != nil {
		return nil, err
	}

	opts := applyOptions(options...)
	tp := tracesdk.NewTracerProvider(
		// set sample
		tracesdk.WithSampler(tracesdk.TraceIDRatioBased(opts.SamplingRatio)),
		// Always be sure to batch in production.
		tracesdk.WithBatcher(exporter),
		// Record information about this application in an Resource.
		tracesdk.WithResource(resource.NewWithAttributes(
			semconv.SchemaURL,
			semconv.ServiceNameKey.String(serviceName),
		)),
	)

	// Register our TracerProvider as the global so any imported
	// instrumentation in the future will default to using it.
	otel.SetTracerProvider(tp)
	otel.SetTextMapPropagator(jaegerprop.Jaeger{})

	return tp, nil
}
```

### Tracer

`Tracer` 表示一次完整的追踪链路，`tracer` 由一个或多个 `span` 组成。下图示例表示了一个由8个 `span` 组成的 `tracer`:

```
        [Span A]  ←←←(the root span)
            |
     +------+------+
     |             |
 [Span B]      [Span C] ←←←(Span C is a `ChildOf` Span A)
     |             |
 [Span D]      +---+-------+
               |           |
           [Span E]    [Span F] >>> [Span G] >>> [Span H]
                                       ↑
                                       ↑
                                       ↑
                         (Span G `FollowsFrom` Span F)
```

时间轴的展现方式会更容易理解：
```
––|–––––––|–––––––|–––––––|–––––––|–––––––|–––––––|–––––––|–> time

 [Span A···················································]
   [Span B··············································]
      [Span D··········································]
    [Span C········································]
         [Span E·······]        [Span F··] [Span G··] [Span H··]
```

我们通常通过以下方式创建一个 `Tracer`：

```
otel.Tracer(tracerName)
// 或者
otel.GetTracerProvider().Tracer(tracerName)
```

### Span

`Span` 是一条追踪链路中的基本组成要素，一个 `span` 表示一个独立的工作单元，比如可以表示一次函数调用，一次 `http` 请求等等。`span` 会记录如下基本要素:

 - 操作名称（`operation name`） 
 - 操作的开始时间和结束时间
 - K/V形式的Tags
 - K/V形式的Logs
 - `SpanContext`

`Span` 是这么多对象中使用频率最高的，因此创建 `Span` 也非常简便，例如：

```go
otel.Tracer().Start(ctx, spanName, opts ...)
// 或者
otel.Tracer(tracerName).Start(ctx, spanName, opts ...)
```

### Attributes

`Attributes` 以 `K/V` 键值对的形式保存用户自定义标签，主要用于链路追踪结果的查询过滤。例如：`http.method="GET", http.status_code=200`。其中 `key` 值必须为字符串，`value` 必须是字符串，布尔型或者数值型。  `span` 中的 `Attributes` 仅自己可见，不会随着  `SpanContext` 传递给后续 `span`。 设置 `Attributes` 方式例如：

```go
span.SetAttributes(
	label.String("http.remote", conn.RemoteAddr().String()),
	label.String("http.local", conn.LocalAddr().String()),
)
```

### Event

`Events` 与 `Attributes` 类似，也是 `K/V` 键值对形式。与 `Attributes` 不同的是，`Events` 还会记录写入 `Events` 的时间，因此 `Events` 主要用于记录某些事件发生的时间。`Events` 的 `key` 值同样必须为字符串，但对 `value` 类型则没有限制。例如：

```
span.AddEvent("http.request", trace.WithAttributes(
	label.Any("http.request.header", headers),
	label.String("http.request.body", bodyContent),
))
```

### SpanContext

`SpanContext` 携带着一些用于跨服务通信的（跨进程）数据，主要包含：

 - 足够在系统中标识该span的信息，比如：`span_id`, `trace_id`。
 - `Baggage` - 为整条追踪连保存跨服务（跨进程）的K/V格式的用户自定义数据。`Baggage` 与 `Attributes` 类似，也是 `K/V` 键值对。与 `Attributes` 不同的是：
    - 其 `key` 跟 `value` 都只能是字符串格式
    - `Baggage` 不仅当前 `span` 可见，其会随着 `SpanContext` 传递给后续所有的子 `span` 。要小心谨慎的使用 `Baggage` - 因为在所有的span中传递这些K,V会带来不小的网络和CPU开销。

### Propagator

`Propagator` 传播器用于端对端的数据编码/解码，例如：`Client` 到 `Server` 端的数据传输，`TraceId`、`SpanId`和`Baggage`也是需要通过传播器来管理数据传输。业务端开发者往往对`Propagator`无感知，只有中间件/拦截器的开发者需要知道它的作用。`OpenTelemetry`的标准协议实现库提供了常用的`TextMapPropagator`，用于常见的文本数据端到端传输。此外，为保证`TextMapPropagator`中的传输数据兼容性，不应当带有特殊字符，具体请参考：[https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/context/api-propagators.md](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/context/api-propagators.md)

设置示例
```go
// pkg/trace/tracer.go
func InitTracerProvider(serviceName, endpoint string, options ...Option) (*tracesdk.TracerProvider, error) {
	...

	opts := applyOptions(options...)
	tp := tracesdk.NewTracerProvider(
		// set sample
		tracesdk.WithSampler(tracesdk.TraceIDRatioBased(opts.SamplingRatio)),
		// Always be sure to batch in production.
		tracesdk.WithBatcher(exporter),
		// Record information about this application in an Resource.
		tracesdk.WithResource(resource.NewWithAttributes(
			semconv.SchemaURL,
			semconv.ServiceNameKey.String(serviceName),
		)),
	)

	otel.SetTracerProvider(tp)
  // 全局设置
	otel.SetTextMapPropagator(jaegerprop.Jaeger{})

	return tp, nil
}
```
