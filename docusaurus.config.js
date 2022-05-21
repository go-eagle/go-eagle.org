const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Eagle',
  tagline: 'A microservice framework for Go',
  url: 'https://go-eagle.org',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'go-eagle', // Usually your GitHub org/user name.
  projectName: 'go-eagle.org', // Usually your repo name.
  trailingSlash: false,
  themeConfig: {
    announcementBar: {
      id: 'github-twitter',
      content: '⭐️ If you like Eagle, give it a star on <a target="_blank" rel="noopener noreferrer" href="https://github.com/go-eagle/eagle">GitHub</a> 🚀'
    },
    hideableSidebar: true,
    navbar: {
      title: 'Eagle',
      style: 'primary',
      hideOnScroll: false,
      logo: {
        alt: 'Eagle Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://pkg.go.dev/github.com/go-eagle/eagle/',
          label: 'API',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          href: 'https://github.com/go-eagle/eagle',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Guide',
              to: '/docs',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/HtTfsxFN',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/go-eagle/eagle',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} go-eagle.org`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/go-eagle/go-eagle.org/edit/main/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/go-eagle/go-eagle.org/edit/main/',
        },
        googleAnalytics: {
          trackingID: '',
          anonymizeIP: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [
    'docusaurus-plugin-sass',
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh'],
    localeConfigs: {
      zh: {
        label: '中文',
      },
      // en: {
      //   label: 'English',
      // },
    },
  },
};
