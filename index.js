import DefaultTheme from 'vitepress/theme'
import { Quasar, Dialog } from 'quasar'
import KeycloakLayout from './layouts/KeycloakLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: KeycloakLayout,
  enhanceApp({ app }) {
    // Use Quasar framework
    app.use(Quasar, { plugins: { Dialog } }, { req: { headers: {} } })
    // Dynamic registration of all components
    const modules = import.meta.glob(['../components/*.vue', './components/*.vue'])
    for (const path in modules) modules[path]().then((module) => app.component(module.default.__name, module.default))
  }
}