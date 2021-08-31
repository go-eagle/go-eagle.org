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
        'getting-started/faq',
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
