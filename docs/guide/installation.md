---
title: Installation
---

# Installation

## Installing the theme

Install the theme with:

```bash
pnpm add -D @kalisio/vitepress-theme
```

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

Then install them with:

```bash
pnpm install
```
:::

## Enabling the theme

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