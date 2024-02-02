import _ from 'lodash'
import DefaultTheme from 'vitepress/theme'
import { Quasar, Dialog } from 'quasar'
import KeycloakLayout from './layouts/KeycloakLayout.vue'
import KHomeFooter from './components/KHomeFooter'
import KalisioMaps from './components/KalisioMaps'
import TemplateUrl from './components/TemplateUrl'
import TourLink from './components/TourLink'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: KeycloakLayout,
  enhanceApp({ app }) {
    // Use Quasar framework
    app.use(Quasar, { plugins: { Dialog } }, { req: { headers: {} } })
    // Dynamic registration of all components
    app.component('KHomeFooter', KHomeFooter)
    app.component('KalisioMaps', KalisioMaps)
    app.component('TemplateUrl', TemplateUrl)
    app.component('TourLink', TourLink)
  }
}