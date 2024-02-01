# vitepress-theme-kalisio

> Kalisio VitePress theme

## Features

This theme provide you with:
* the capability to secure the access to the site using [Keycloak](https://www.keycloak.org/)
* the ease to define custom components using [Quasar framework](https://quasar.dev/)
* a set of ready to use components

## Getting started

### Installing the theme

To install the theme using the master branch:

```bash
yarn add -D https://github.com/kalisio/vitepress-theme-kalisio
```

To install the theme using a specific branch:

```bash
yarn add -D https://github.com/kalisio/vitepress-theme-kalisio#<branch>
```

### Using the theme

To use the theme, import and re-export it from the custom theme entry:

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
  ssr: {
    noExternal: ['vitepress-theme-kalisio'],
  }
}
```

## Components

### HomeFooter

This component provides a footer for the home page. You can customize the content using a specifc section ont `config.js`:

```js
trustLogos: [
  { imageLink: '', link: '' }
]
```

## KalisioMaps

## TourLink

## TemplateUrl
