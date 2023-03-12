// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

require("dotenv").config();

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Peaut Lover Tech Blog",
  tagline: "개발, 철학, 경험에 대한 글을 남깁니다.",
  url: "https://peanut-lover.github.io/",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "peanut-lover", // Usually your GitHub org/user name.
  projectName: "peanut-lover.github.io", // Usually your repo name.
  trailingSlash: false,
  deploymentBranch: "gh-pages",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        /**
         * Required for any multi-instance plugin
         */
        id: "story-blog",
        /**
         * URL route for the blog section of your site.
         * *DO NOT* include a trailing slash.
         */
        routeBasePath: "/story",
        /**
         * Path to data on filesystem relative to site dir.
         */
        path: "./story-blog",
      },
    ],
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/docs", // Serve the docs at the site's root
        },
        blog: {
          routeBasePath: "/blog", // Serve the blog at the site's root
          showReadingTime: true,
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Peanut Lover Tech Blog",
        // logo: {
        //   alt: "My Site Logo",
        //   src: "img/logo.svg",
        // },
        items: [
          // NOTE: if you want to show docs,
          // {
          //   type: 'doc',
          //   docId: 'intro',
          //   position: 'left',
          //   label: 'Tutorial',
          // },
          { to: "/blog", label: "Frontend", position: "left" },
          { to: "/docs", label: "Document", position: "left" },
          { to: "/story", label: "Story", position: "left" },
          {
            href: "https://github.com/peanut-lover",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Blog",
            items: [
              {
                label: "Tech Blog",
                to: "/blog",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Frontend Blog",
                to: "/blog",
              },
              {
                label: "Story Blog",
                to: "/story",
              },
              {
                label: "Document",
                to: "/docs",
              },
              {
                label: "GitHub",
                href: "https://github.com/peanut-lover",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
