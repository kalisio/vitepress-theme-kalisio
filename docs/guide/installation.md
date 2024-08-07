# Installation

## Installing the theme

To install the theme using the master branch:

```bash
yarn add -D https://github.com/kalisio/vitepress-theme-kalisio
```

To install the theme using a specific branch:

```bash
yarn add -D https://github.com/kalisio/vitepress-theme-kalisio#<branch>
```

You also need to install the required dev dependencies:

| Dependency | Version |
|---|---|
| **keycloak-js** | ^23.0.5 |
| **lodash** | ^4.17.21 |
| **moment** | ^2.30.1 |
| **quasar** | ^2.14.3 |
| **vitepress** | ^1.3.0 |

::: tip
You can also copy the following `devDependencies` in your `package.json` and install them:
```json
"devDependencies": {
  "keycloak-js": "^23.0.5",
  "lodash": "^4.17.21",
  "moment": "^2.30.1",
  "quasar": "^2.14.3",
  "vitepress": "^1.3.0",
  "vitepress-theme-kalisio": "https://github.com/kalisio/vitepress-theme-kalisio"
}
```
:::

## Enabling the theme

To enable the theme, import and re-export it from the custom theme entry:

```js
// .vitepress/theme/index.js
import Theme from 'vitepress-theme-kalisio'
export default Theme
```

And provide some specific configuration to allow the build. Add the following **vite** configuration:

```js
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
    noExternal: ['vitepress-theme-kalisio'],
  }
}
```
