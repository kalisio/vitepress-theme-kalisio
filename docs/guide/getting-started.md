---
title: Getting started
---

# Getting started

## Installing the theme

Install the theme with your package manager of choice:

::: code-group

```bash [pnpm]
pnpm add -D @kalisio/vitepress-theme
```

```bash [npm]
npm install -D @kalisio/vitepress-theme
```

```bash [yarn]
yarn add -D @kalisio/vitepress-theme
```

:::

You also need to install the required peer dependencies:

| Dependency    | Version   |
| ------------- | --------- |
| **quasar**    | `~2.14.3` |
| **vitepress** | `~1.6.0`  |
| **vue**       | `~3.5.0`  |

::: tip
You can also declare all required dependencies directly in your `package.json`:

```json
"devDependencies": {
  "@kalisio/vitepress-theme": "~2.0.0",
  "quasar": "~2.14.3",
  "vitepress": "~1.6.0",
  "vue": "~3.5.0"
}
```

Then install them with `pnpm install`.
:::

## Configuring the theme

### Enabling the theme

To enable the theme, import and re-export it from the custom VitePress theme entry:

```js
// .vitepress/theme/index.js
import Theme from '@kalisio/vitepress-theme'
export default Theme
```

The theme must also be processed during SSR. Add the following Vite configuration to your VitePress config:

```js
vite: {
  ssr: {
    noExternal: ['@kalisio/vitepress-theme']
  }
}
```

### Internationalization

The theme ships localizable UI strings and resolves them from the active site language. Both **English** and **French** are provided out of the box, so no configuration is required.

Strings are selected from the active site language (`useData().lang`), matching on the primary language subtag — so `fr-FR` and `fr-CA` both resolve to `fr`. The resolution order is:

1. A consumer override declared in `ThemeConfig`
2. The built-in copy for the active language
3. English

#### Access-denied dialog

Displayed when access is denied through **referrer restriction** or **Keycloak authentication**. Override its title and message with a `messages.accessDenied` property in the `ThemeConfig` object:

```js
messages: {
  accessDenied: {
    title: 'Access denied',
    message: 'You are not authorized to access this site'
  }
}
```

::: tip
On a multilingual site, declare `messages` per locale so the dialog follows the active language:

```js
locales: {
  root: { lang: 'en', themeConfig: { messages: { accessDenied: { title: 'Access denied', message: 'You are not authorized to access this site' } } } },
  fr:   { lang: 'fr', themeConfig: { messages: { accessDenied: { title: 'Accès refusé', message: 'Vous n\'êtes pas autorisé à accéder à ce site' } } } }
}
```
:::