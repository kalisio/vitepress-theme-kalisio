import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/vitepress-theme-kalisio/',
  title: " ",
  description: "Kalisio Vitepress Theme",
  lastUpdated: true,
  head: [
    [ 'link', { rel: "icon", type: "image/ico", href: "kalisio.ico" }],
    [ 'link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons', type: 'text/css' } ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/kalisio.png',
    nav: [
      { text: 'Guide', link: 'guide/installation.md' },
      { text: 'About', link: 'about/motivation.md' }
    ],
    sidebar: {
      '/guide/': [
        { text: 'Installation', link: '/guide/installation' },
        { text: 'Usage', link: '/guide/usage' }
      ],
      '/about/': [
        { text: 'Motivation', link: '/about/motivation' },
        { text: 'Contributing', link: '/about/contributing' },
        { text: 'License', link: '/about/license' },
        { text: 'Contact', link: '/about/contact' }
      ]
    },
    footer: {
      copyright: 'Copyright © 2017-20xx - KALISIO'
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/kalisio' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/kalisio/?originalSubdomain=fr' },
      { icon: 'twitter', link: 'https://twitter.com/Kalisio3' },
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCovN722Sgw61M6uk-73vwQw' },
    ],
    useKeycloak: false,
    keycloak: {
      url: process.env.KEYCLOAK_URL,
      realm: process.env.KEYCLOAK_REALM,
      clientId: process.env.KEYCLOAK_SECRET_ID,
      fallbackUrl: 'https://kalisio.com'
    }
  },
  vite: {
    optimizeDeps: {
      include: ['keycloak-js', 'lodash'],
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/]
      },
    },
    ssr: {
      noExternal: ['vitepress-theme-kalisio']
    }
  }
})
