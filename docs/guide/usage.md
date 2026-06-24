# Usage

## Using referrer restriction

To restrict the access to the site from a set of subdomains referrers, you need to declare the following properties in the `ThemeConfig` object:

1. `referrer` with such a content:

```js
referrer: {
  subdomains: 'kalisio.com,doc.kalisio.xyz'  // Subdomains to auhtorize the access
}
```

2. `useReferrer` to `true`

## Using Keycloak authentication

To enforce user authentication with **Keycloak**, all you need to do is to declare the followinf properties in the `ThemeConfig` object:

1. `keycloak` with such a content:

```js
keycloak: {
  url: 'https://keycloak.url',        // Url to the Keycloak instance
  realm: 'keycloak realm',            // Keycloak realm to be used
  clientId: 'site',                   // Keycloak client id assigned to your site
  roles: ['role1', 'role2', ...]      // Keycloak realm roles required to access the site
  fallbackUrl: 'https://kalisio.com'  // Fallback Url if access is denied
}
```

2. `useKeycloak` to `true`

```js
useKeycloak: true
```

::: tip
During development, it may be convenient to bypass **Keycloak** authentication. You can achieve this by either commenting out the relevant line or utilizing an environment variable. This allows you to set or unset the variable, avoiding the need to modify the `config.js` file.
:::

::: tip
You can combine **referrer restriction** and **Keycloak authentication**. In that case, **Keycloak authentication** will be executed if and only if **referrer restriction** fails.
:::

## Using Quasar framework

**Quasar framework** is shipped with the theme. You can simply create any components and use any features provided by Quasar. 

::: warning
There is still some work to be done to use SASS **Quasar** variables, internationalization (i18n) and plugins. For now the [Dialog plugin](https://quasar.dev/quasar-plugins/dialog/) is the only plugin installed.
:::

## Using OpenAPI extension 

The theme integrates [vitepress-openapi](https://vitepress-openapi.vercel.app/) to render API reference pages from an **OpenAPI** specification. Its components (`OASpec`, `OAOperation`, `OAIntroduction`, ...) are registered globally and its styles are imported by the theme.

`vitepress-openapi` is declared as an **optional peer dependency**, so you must install it in your project to use these components (see [Installation](./installation.md#installing-the-theme)):

```bash
pnpm add -D vitepress-openapi
```

To render a full specification, import the spec and use the `OASpec` component in a Markdown page:

```md
<script setup>
import spec from '../public/openapi.json'
</script>

<OASpec :spec="spec" />
```

To render a single operation, use `OAOperation` with the `operationId` declared in your spec:

```md
<OAOperation :spec="spec" operationId="getUsers" />
```

::: tip
You can place your specification anywhere that VitePress can import (e.g. the `public` folder) and reference it from your pages. See the [vitepress-openapi documentation](https://vitepress-openapi.vercel.app/components/) for the full list of components and configuration options.
:::

## Generating package sidebars

The theme ships a `generateSideBar` helper that builds a VitePress sidebar automatically from the files of a package, so you don't have to maintain the sidebar entries by hand.

It is a build-time helper (it reads the file system), so it is exposed on a dedicated entry point and used in your `config.js`, **not** in the theme.

List your package names in a `packages.json` file next to your config and generate every package sidebar at once:

```js
import { defineConfig } from 'vitepress'
import { generateSideBar } from 'vitepress-theme-kalisio/sidebar'
import packages from './packages.json'

const sortedPackageSidebar = Object.fromEntries(
  packages.sort().map(pkg => [`/packages/${pkg}/`, generateSideBar(pkg)])
)

export default defineConfig({
  themeConfig: {
    sidebar: {
      // ...your own hand-written sections (e.g. '/overview/')
      ...sortedPackageSidebar
    }
  }
})
```

For each package, the helper walks `packages/<name>/` and returns a sidebar where:

* a top-level link to the package landing page (`/packages/<name>/index`) is always added first,
* every `.md` file other than `index.md` becomes a link (its name without the `.md` extension),
* every sub-folder that contains at least one such file becomes a nested group (empty folders are skipped).

::: tip
The package folder is resolved relative to the current working directory (`packages/<name>`), so run VitePress from the repository root.
:::

## Using ready-made components

Here, we offer a comprehensive description of the various components shipped with the theme.

### HomeFooter

This component renders a footer for the home page.

Within the `ThemeConfig` section:

```js
trustLogos: [
  { imageLink: '', link: '' }
]
```

_TODO_

### Image

This component renders an image that supports the **dark** mode.

It exposes the following props:

| Name | Description | Default |
|---|---|---|
| `src` | the image to be displayed in normal mode | '' |
| `darkSrc` | the image to be displayed in dark mode | '' |

> Example
> ```md
> <Image src="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-light-x256.png" 
> darkSrc="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-dark-x256.png" />
> ```
>
> <Image src="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-light-x256.png" 
> darkSrc="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-dark-x256.png" />

### KalisioLogo

This component renders an **Kalisio** logo using the [Image](./usage.md#image) component.

> Example
> ```md
> <KalisioLogo />
> ```
>
> <KalisioLogo />

### KalisioMaps

This component renders an instance of **Kano** wihtin an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

If you like to get automatically connected, you must provide a token within the `maps` section in the `ThemeConfig`:

```js
maps: [
  jwt: '<TOKEN>'   // the token to get automatically connected
]
```

> Example
> ```md
> <KalisioMaps />
> ```
>
> <KalisioMaps />

### TemplateAnchor

This component allows to interpolate an `href` according a context that includes:
* a **domain**: if you like to query an API depending on the flavor
* a **time**: if you like to query an API at a specific time
* a **jwt** : if you like to query an API that requires authentication

It exposes the following props:

| Name | Description | Default |
|---|---|---|
| `text` | text to display | Required |
| `hrefTemplate` | the url to be interpolated | Required |
| `domainPath`| the path to extract the **domain** value in the `ThemeConfig` section | `jwt`|
| `jwtPath`| the path to extract the **jwt** value in the `ThemeConfig` section | `domain`|

And it required to define within the `ThemeConfig` section the required keys:

```js
  domain: '<DOMAIN>'  // the domain to use when interpolating the url
  jwt: '<TOKEN>'   // the token to use if authentication is required
```

::: tip TIP
Set the `domainPath` and `jwtPath` if you declare the keys `domain` and `jwt` in a different section
:::

### TourLink

_TODO_