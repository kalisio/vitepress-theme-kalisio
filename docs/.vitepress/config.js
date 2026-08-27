import { defineConfig } from 'vitepress'
import { generateSidebars } from '../../src/sidebar.js'

export default defineConfig({
  base: '/vitepress-theme-kalisio/',
  title: ' ',
  description: 'Kalisio Vitepress Theme',
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/png', href: 'https://kalisio.github.io/kalisioscope/kalisio/kalisio-icon-light-128x128.png' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons', type: 'text/css' }]
  ],
  themeConfig: {
    logo: 'https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-light-x256.png',
    nav: [
      { text: 'Guide', link: '/guide/installation' },
      { text: 'About', link: '/about/01-motivation' }
    ],
    sidebar: generateSidebars({
      configUrl: import.meta.url,
      capitalize: true
    }),
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
      { icon: 'youtube', link: 'https://www.youtube.com/channel/UCovN722Sgw61M6uk-73vwQw' }
    ],
    useReferrer: false,
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
      include: ['keycloak-js', 'lodash-es']
    },
    build: {
      commonjsOptions: {
        include: [/node_modules/]
      }
    },
    ssr: {
      noExternal: ['@kalisio/vitepress-theme']
    }
  }
})