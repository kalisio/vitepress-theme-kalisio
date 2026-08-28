---
title: Using referrer restriction
---

# Using referrer restriction

To restrict the access to the site from a set of subdomains referrers, you need to declare the following properties in the `ThemeConfig` object:

1. `referrer` with such a content:

```js
referrer: {
  subdomains: 'kalisio.com,doc.kalisio.xyz'  // Subdomains to auhtorize the access
}
```

2. `useReferrer` to `true`