# vitepress-theme-kalisio

> Kalisio VitePress theme

Thie Kaliso VitePress theme provide you with:
* the ability to secure access to the site using [Keycloak](https://www.keycloak.org/)
* the ease of defining custom components using [Quasar framework](https://quasar.dev/)
* a set of ready-made UI components

## Installing the theme

To install the theme using the master branch:

```bash
yarn add -D https://github.com/kalisio/vitepress-theme-kalisio
```

To install the theme using a specific branch:

```bash
yarn add -D https://github.com/kalisio/vitepress-theme-kalisio#<branch>
```

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
  ssr: {
    noExternal: ['vitepress-theme-kalisio'],
  }
}
```

## Using the theme

### Using Keycloak authentication

To enforce user authentication with **Keycloak**, all you need to do is:

1. Declare a `keycloak` section in the `ThemeConfig` object like this:

```js
keycloak: {
  url: 'https://keycloak.url',        // Url to the Keycloak instance
  realm: 'keycloak realm',            // Keycloak realm to be used
  clientId: 'site',                   // Keycloak client id assigned to your site
  fallbackUrl: 'https://kalisio.com'  // Fallback Url if access is denied
}
```

2. Declare a `useKeycloak` property to `true` in the `ThemeConfig` object:

```js
useKeycloak: true
```

> [!TIP]
> During development, it may be convenient to bypass **Keycloak** authentication. You can achieve this by either commenting out the relevant line or utilizing an environment variable. This allows you to set or unset the variable, eliminating the need to modify the `config.js` file.

### Using Quasar framework

**Quasar framework** is shipped with the theme. You can simply create any components and use any features provided by Quasar. 

> [!WARNING]  
> There is still some work to be done to use SASS **Quasar** variables, internationalization (i18n) and plugins. For now the [Dialog plugin](https://quasar.dev/quasar-plugins/dialog/) is the only plugin installed.

### Using ready-made components

Here, we offer a comprehensive description of the various components shipped with the theme.

#### HomeFooter

##### Description

This component renders a footer for the home page.

##### Configuration

Within the `ThemeConfig` section:

```js
trustLogos: [
  { imageLink: '', link: '' }
]
```
#### KalisioMaps

##### Description

This component renders an instance of **Kano** wihtin an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

##### Configuration

Within the `ThemeConfig` section:

```js
maps: [
  jwt: 'XXXXXXXXXXXXXXX'   // the token to get automatically connected
]
```

#### TemplateAnchor

##### Description

This component allows to interpolate an `href` according a context that includes:
* a **domain**: if you like to query an API depending on the flavor
* a **time**: if you like to query an API at a specific time
* a **jwt** : if you like to query an API that requires authentication

##### Props

| Name | Description | Default |
|---|---|---|
| `text` | text to display | Required |
| `hrefTemplate` | the url to be interpolated | Required |
| `domainPath`| the path to extract the **domain** value in the `ThemeConfig` section | `jwt`|
| `jwtPath`| the path to extract the **jwt** value in the `ThemeConfig` section | `domain`|

##### Configuration

Within the `ThemeConfig` section.

```js
  domain: 'xxxx.yyyyy.xyz'  // the domain to use when interpolating the url
  jwt: 'XXXXXXXXX'   // the token to use if authentication is required
```

> [!IMPORTANT]
> Set the `domainPath` and `jwtPath` if you declare the keys `domain` and `jwt` in a different section

#### TourLink

##### Description

##### Props