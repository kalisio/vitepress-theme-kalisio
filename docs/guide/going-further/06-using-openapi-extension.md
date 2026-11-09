---
title: Using OpenAPI extension
---

# Using OpenAPI extension

The **Kalisio** theme integrates [vitepress-openapi](https://vitepress-openapi.vercel.app/) to render interactive API documentation from OpenAPI specifications.

All components and styles are automatically registered by the theme. No additional installation or setup is required.

## Usage

Import your OpenAPI specification and use the provided components in your Markdown pages:

```md
<script setup>
import spec from './specs/openapi.json'
</script>

<OASpec :spec="spec" />
```

## Configuration

The theme exposes `vitepress-openapi` configuration through `themeConfig.openapi` in `.vitepress/config.js`:

```js
export default {
  themeConfig: {
    openapi: {
      server: {
        allowCustomServer: true
      }
    }
  }
}
```

For available components and configuration options, refer to the [vitepress-openapi documentation](https://vitepress-openapi.vercel.app/).