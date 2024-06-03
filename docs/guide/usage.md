# Usage

## Using Keycloak authentication

To enforce user authentication with **Keycloak**, all you need to do is:

1. Declare a `keycloak` section in the `ThemeConfig` object like this:

```js
keycloak: {
  url: 'https://keycloak.url',        // Url to the Keycloak instance
  realm: 'keycloak realm',            // Keycloak realm to be used
  clientId: 'site',                   // Keycloak client id assigned to your site
  roles: ['role1', 'role2', ...]      // Keycloak realm roles required to acceqq the site
  fallbackUrl: 'https://kalisio.com'  // Fallback Url if access is denied
}
```

2. Declare a `useKeycloak` property to `true` in the `ThemeConfig` object:

```js
useKeycloak: true
```

::: tip
During development, it may be convenient to bypass **Keycloak** authentication. You can achieve this by either commenting out the relevant line or utilizing an environment variable. This allows you to set or unset the variable, avoiding the need to modify the `config.js` file.
:::

## Using Quasar framework

**Quasar framework** is shipped with the theme. You can simply create any components and use any features provided by Quasar. 

::: warning
There is still some work to be done to use SASS **Quasar** variables, internationalization (i18n) and plugins. For now the [Dialog plugin](https://quasar.dev/quasar-plugins/dialog/) is the only plugin installed.
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
### Image

This component renders an image that supports the **dark** mode.

It exposes the following props:

| Name | Description | Default |
|---|---|---|
| `src` | the image to be displayed in normal mode | '' |
| `darkSrc` | the image to be displayed in dark mode | '' |

> Example
> ```md
> <Image 
>  src="//s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-black-256x84.png"
>  darkSrc="https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-white-256x84.png"
> />
> ```
>
> <Image 
>  src="//s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-black-256x84.png"
>  darkSrc="https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-white-256x84.png"
> />

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