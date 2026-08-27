---
title: Using OpenAPI extension
---

# Using OpenAPI extension

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

## Custom server

The theme enables the **custom server** option of `vitepress-openapi`, letting the reader enter the URL of the API instance the requests are sent to:

```js
useTheme({ server: { allowCustomServer: true } })
```

Disabled by default in `vitepress-openapi`, it is turned on by the theme, so there is nothing to declare in your `ThemeConfig`.

::: tip
This is especially useful when the same documentation targets several deployments (production, staging, on-premise instance, ...) that are not all listed in the `servers` section of the specification.
:::

### Declaring the servers in your specification

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

## Authentication

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

