/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  docs: [
    {
      type: 'category',
      label: '快速开始',
      collapsed: false,
      items: [
        'getting-started/overview',
        'getting-started/start',
        'getting-started/layout',
        'getting-started/structure',
        'getting-started/faq',
      ],
    },
    {
      type: 'category',
      label: '核心组件',
      collapsed: false,
      items: [
        'component/config',
        'component/logging',
        'component/errors',
        'component/metrics',
        'component/cache',
        'component/distributed-lock',
        'component/queue',
        {
          type: 'category',
          label: '链路追踪',
          collapsed: true,
          items: [
            'component/tracing/overview',
            'component/tracing/component',
          ],
        },
        {
          type: 'category',
          label: '中间件',
          collapsed: true,
          items: [
            'component/middleware/overview',
            'component/middleware/logging',
            'component/middleware/metrics',
            'component/middleware/tracing',
          ],
        },
        {
          type: 'category',
          label: '传输协议',
          collapsed: true,
          items: [
            'component/transport/overview',
            'component/transport/http',
            'component/transport/grpc',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '环境部署',
      collapsed: false,
      items: [
        'deployment/go-deploy',
        'deployment/jaeger-deploy',
        'deployment/app-deploy',
      ],
    },
    {
      type: 'category',
      label: '开发指南',
      collapsed: false,
      items: [
        'guide/api-protobuf',
        'guide/api-restful',
        'guide/grpc-guide',
      ],
    },
    {
      type: 'category',
      label: '开源社区',
      collapsed: false,
      items: [
        'community/contribution',
        'community/documentation',
      ],
    },
  ],
};
