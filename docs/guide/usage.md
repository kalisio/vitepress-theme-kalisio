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

### Custom server

The theme enables the **custom server** option of `vitepress-openapi`, letting the reader enter the URL of the API instance the requests are sent to:

```js
useTheme({ server: { allowCustomServer: true } })
```

Disabled by default in `vitepress-openapi`, it is turned on by the theme, so there is nothing to declare in your `ThemeConfig`.

::: tip
This is especially useful when the same documentation targets several deployments (production, staging, on-premise instance, ...) that are not all listed in the `servers` section of the specification.
:::

#### Declaring the servers in your specification

The custom server option only **adds** a free entry to the server list: the proposed servers are read from your **OpenAPI specification**. Declare a `servers` section in your spec to get the predefined choices:

```json
{
  "openapi": "3.0.0",
  "servers": [
    { "url": "https://api.kalisio.xyz", "description": "Production" },
    { "url": "https://api.dev.kalisio.xyz", "description": "Development" }
  ]
}
```

The first declared server is the one used by default. The `servers` section can also be declared on a path or on an operation to override the root one.

::: warning
The URLs must be **absolute**, scheme included (e.g. `https://api.kalisio.xyz`, not `api.kalisio.xyz` nor `/api`), and the API must accept **CORS** requests from the origin serving the documentation, since the calls are issued by the reader's browser.
:::

### Authentication

For the reader to be able to enter their credentials in the playground, the authentication must be declared in your **OpenAPI specification**. There is nothing to configure in your `ThemeConfig`, you only need to add two things to your spec:

1. the schemes in `components.securitySchemes`,
2. a `security` section referencing them, at the root of the specification or on a given operation.

```json
{
  "components": {
    "securitySchemes": {
      "BearerAuth": { "type": "http", "scheme": "bearer" },
      "ApiKeyAuth": { "type": "apiKey", "in": "header", "name": "X-API-Key" }
    }
  },
  "security": [
    { "BearerAuth": [] }
  ]
}
```

An **Authorization** field is then displayed in the playground for each declared scheme, and its value is sent along with the requests.

::: tip
Add an `example` to a scheme to prefill the corresponding field:

```json
"BearerAuth": { "type": "http", "scheme": "bearer", "example": "Bearer <token>" }
```

For an `http` scheme, the value is sent as is, so the field must contain the complete value, the `Bearer ` prefix included.
:::

## Using built-in components

Here, we offer a comprehensive description of the various components shipped with the theme.

### HomeFooter

This component renders a footer for the home page with the Kalisio sponsor logo and, optionally, trusted organization logos.

Within the `ThemeConfig` section:

```js
trustLogos: [
  { imageLink: '', link: '' }
]
```

Each entry supports:

| Property    | Description                          |
| ----------- | ------------------------------------ |
| `imageLink` | URL of the trusted organization logo |
| `link`      | URL opened when clicking the logo    |

When `trustLogos` is defined, a **Trusted by** section is displayed above the **Sponsored by** section.


### Image

This component renders an image with support for dark mode.

It exposes the following props:

| Name      | Description                   | Default |
| --------- | ----------------------------- | ------- |
| `src`     | Image displayed in light mode | `''`    |
| `darkSrc` | Image displayed in dark mode  | `''`    |

> Example
>
> ```md
> <Image
>   src="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-light-x256.png"
>   darkSrc="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-dark-x256.png"
> />
> ```
>
> <Image
> src="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-light-x256.png"
> darkSrc="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-dark-x256.png"
> />


### KalisioLogo

This component renders the Kalisio logo using the Image component and automatically adapts it to light and dark modes.

> Example
> ```md
> <KalisioLogo />
> ```
>
> <KalisioLogo />

### KalisioMaps

### KalisioMaps

This component renders an instance of **Kano** within an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

To automatically authenticate the embedded application, provide a JWT token in the `maps` section of `ThemeConfig`:

```js
maps: {
  jwt: '<TOKEN>'
}
```

> Example
>
> ```md
> <KalisioMaps />
> ```
>
> <KalisioMaps />
```

### TemplateAnchor

This component renders a link whose `href` is interpolated from a context that can include:

* a **domain**, for querying an API depending on the configured flavor;
* a **time**, for querying an API at a specific time;
* a **jwt**, for querying an API that requires authentication.

It exposes the following props:

| Name           | Description                                                   | Default  |
| -------------- | ------------------------------------------------------------- | -------- |
| `text`         | Text to display                                               | Required |
| `hrefTemplate` | URL template to interpolate                                   | Required |
| `domainPath`   | Path used to retrieve the **domain** value from `ThemeConfig` | `domain` |
| `jwtPath`      | Path used to retrieve the **jwt** value from `ThemeConfig`    | `jwt`    |

The corresponding values must be defined in `ThemeConfig`:

```js
domain: '<DOMAIN>',
jwt: '<TOKEN>'
```

::: tip TIP
Use `domainPath` and `jwtPath` when the domain and jwt values are declared in another section of `ThemeConfig`.
:::

### TourLink

This component renders a link to the application configured in `ThemeConfig`.

It exposes the following props:

| Name     | Description                                            | Default |
| -------- | ------------------------------------------------------ | ------- |
| `text`   | Text to display                                        | `''`    |
| `path`   | Application route appended to the base application URL | `''`    |
| `params` | Query parameters appended to the URL                   | `{}`    |

The application base URL must be defined in `ThemeConfig`:

```js
appUrl: 'https://example.com/'
```

By default, the component adds the `tour=true` query parameter unless a `tour` parameter is explicitly provided.

> Example
>
> ```md
> <AppAnchor
>   text="Open application"
>   path="map"
>   :params="{ project: 'demo' }"
> />
> ```

The generated link is opened in a new browser tab.

## Using sidebars helpers

The sidebar helpers automatically generate VitePress sidebars from the documentation directory structure.

### generateSidebar

`generateSidebar` generates the sidebar entries for a single documentation section.

```js
generateSidebar({
  rootDir: 'guide',
  baseUrl: '/guide',
  capitalize: true
})
```

Available options:

| Option       | Description                                             |
| ------------ | ------------------------------------------------------- |
| `rootDir`    | Directory containing the Markdown documentation         |
| `baseUrl`    | Base URL used to generate sidebar links                 |
| `index`      | Optional entry inserted at the beginning of the sidebar |
| `exclude`    | Markdown files to exclude. Defaults to `['index.md']`   |
| `capitalize` | Capitalizes generated sidebar labels                    |

Directories are converted to sidebar groups and Markdown files to sidebar entries.

### generateSidebars

`generateSidebars` generates the complete VitePress sidebar configuration from the direct subdirectories of a root directory.

```js
sidebar: generateSidebars({
  rootDir: '.',
  baseUrl: '',
  capitalize: true
})
```

For example, `guide/` and `about/` directories automatically generate `/guide/` and `/about/` sidebar sections.

### generatePackageSidebar

`generatePackageSidebar` is a convenience helper for package documentation.

```js
generatePackageSidebar('common-core')
```

It follows the package conventions:

```text
packages/<pkg>/
public/<pkg>-openapi.json
```

The package index is automatically added as the first sidebar entry. If an OpenAPI specification is available, the `<pkg>-openapi` entry is automatically enriched with the API operations generated by `vitepress-openapi`.

For example:

```js
sidebar: {
  '/packages/common-core/': generatePackageSidebar('common-core'),
  '/packages/common-geospatial/': generatePackageSidebar('common-geospatial')
}
```

### OpenAPI integration

`addOpenApiSidebar` can also be used directly to enrich an existing sidebar with operations from an OpenAPI specification.
