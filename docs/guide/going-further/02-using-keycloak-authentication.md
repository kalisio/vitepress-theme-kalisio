---
title: Using Keycloak authentication
---

# Using Keycloak authentication

To enforce user authentication with **Keycloak**, all you need to do is to declare the following properties in the `ThemeConfig` object:

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