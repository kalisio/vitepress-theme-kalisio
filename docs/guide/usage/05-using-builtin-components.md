---
title: Using built-in components
---

# Using built-in components

Here, we offer a comprehensive description of the various components shipped with the theme.

## HomeFooter

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


## Image

This component renders an image with support for dark mode.

It exposes the following props:

| Name      | Description                   | Default |
| --------- | ----------------------------- | ------- |
| `src`     | Image displayed in light mode | `''`    |
| `darkSrc` | Image displayed in dark mode  | `''`    |

```md
<Image
  src="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-light-x256.png"
  darkSrc="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-dark-x256.png"
/>
```
>
<Image
 src="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-light-x256.png"
 darkSrc="https://kalisio.github.io/kalisioscope/kalisio/kalisio-logo-dark-x256.png"
/>

## KalisioLogo

This component renders the Kalisio logo using the Image component and automatically adapts it to light and dark modes.


 ```md
<div style="width: 256px;">
  <KalisioLogo  />
</div>
 ```

<div style="width: 256px;">
<KalisioLogo  />
</div>

## KalisioMaps

This component renders an instance of **Kano** within an [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).

To automatically authenticate the embedded application, provide a JWT token in the `maps` section of `ThemeConfig`:

```js
maps: {
  jwt: '<TOKEN>'
}
```

```md
<KalisioMaps />
```

<KalisioMaps />

## TemplateAnchor

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

## TourLink

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

```md
<TourLink
   text="Open application"
  path="map"
   :params="{ project: 'demo' }"
/>
```

The generated link is opened in a new browser tab.

