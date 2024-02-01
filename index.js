import _ from 'lodash'
import DefaultTheme from 'vitepress/theme'
import { Quasar, Dialog } from 'quasar'
import KeycloakLayout from './layouts/KeycloakLayout.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout: KeycloakLayout,
  async enhanceApp({ app }) {
    // Use Quasar framework
    app.use(Quasar, { plugins: { Dialog } }, { req: { headers: {} } })
    // Dynamic registration of all components
    const modules = await import.meta.glob(['./components/*.vue'])
    for (const path in modules) modules[path]().then((module) => app.component(module.default.__name, module.default))
  }
}
