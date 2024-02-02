import _ from 'lodash'
import DefaultTheme from 'vitepress/theme'
import { Quasar, Dialog } from 'quasar'
import KeycloakLayout from './layouts/KeycloakLayout.vue'
import HomeFooter from './components/HomeFooter.vue'
import KalisioMaps from './components/KalisioMaps.vue'
import TemplateAnchor from './components/TemplateAnchor.vue'
import TourLink from './components/TourLink.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: KeycloakLayout,
  enhanceApp({ app }) {
    // Use Quasar framework
    app.use(Quasar, { plugins: { Dialog } }, { req: { headers: {} } })
    // Dynamic registration of all components
    app.component('HomeFooter', HomeFooter)
    app.component('KalisioMaps', KalisioMaps)
    app.component('TemplateAnchor', TemplateAnchor)
    app.component('TourLink', TourLink)
  }
}