import DefaultTheme from 'vitepress/theme'
import { Quasar, Dialog } from 'quasar'
import { theme as openApiTheme, useTheme } from 'vitepress-openapi/client'
import KeycloakLayout from './layouts/KeycloakLayout.vue'
import HomeFooter from './components/HomeFooter.vue'
import Image from './components/Image.vue'
import KalisioLogo from './components/KalisioLogo.vue'
import KalisioMaps from './components/KalisioMaps.vue'
import TemplateAnchor from './components/TemplateAnchor.vue'
import TourLink from './components/TourLink.vue'
import 'vitepress-openapi/dist/style.css'
import './css/custom.css'

export default {
  extends: DefaultTheme,
  Layout: KeycloakLayout,
  enhanceApp ({ app }) {
    // Use Quasar framework
    app.use(Quasar, { plugins: { Dialog } }, { req: { headers: {} } })
    // Usage of vitepress-openapi components
    openApiTheme.enhanceApp({ app })
    // Enable the custom server option for API
    useTheme({ server: { allowCustomServer: true } })
    // Dynamic registration of all components
    app.component('HomeFooter', HomeFooter)
    app.component('Image', Image)
    app.component('KalisioLogo', KalisioLogo)
    app.component('KalisioMaps', KalisioMaps)
    app.component('TemplateAnchor', TemplateAnchor)
    app.component('TourLink', TourLink)
  }
}
