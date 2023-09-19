import DefaultTheme from 'vitepress/theme'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(Quasar)
  }
}