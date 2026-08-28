<template>
  <div v-if="hasAccess">
    <Layout />
  </div>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData, inBrowser } from 'vitepress'
import { ref, watch, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import Keycloak from 'keycloak-js'
import { defaultMessages } from '../defaults.js'

// Data
const { theme, lang, isDark } = useData()
const { Layout } = DefaultTheme
const $q = useQuasar()
// Enabled access gates
const useReferrer = theme.value.useReferrer === true || theme.value.useReferrer === 'true'
const useKeycloak = theme.value.useKeycloak === true || theme.value.useKeycloak === 'true'
const gated = useReferrer || useKeycloak
// Deny by default when gated
const hasAccess = ref(!gated)

// Functions
function passReferrer () {
  if (!document.referrer) return false
  let subdomains = theme.value?.referrer?.subdomains ?? []
  if (!Array.isArray(subdomains)) subdomains = String(subdomains).split(',')
  return subdomains.some(subdomain => document.referrer.includes(subdomain))
}
async function passKeycloak () {
  const keycloak = new Keycloak(theme.value.keycloak)
  let auth
  try {
    auth = await keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
  } catch (error) {
    console.error('[@kalisio/vitepress-theme] Keycloak init failed', error)
    return false
  }
  if (!auth) {
    window.location.reload()
    return false
  }
  const acceptedRoles = theme.value?.keycloak?.roles ?? []
  if (acceptedRoles.length === 0) return true
  const userRoles = keycloak?.realmAccess?.roles ?? []
  return userRoles.some(role => acceptedRoles.includes(role))
}

// Watch
watch(isDark, (value) => {
  if (inBrowser) $q.dark.set(value)
}, { immediate: true })

// Hooks
onMounted(async () => {
  if (!gated) return
  let granted = false
  if (useReferrer) granted = passReferrer()
  if (!granted && useKeycloak) granted = await passKeycloak()
  hasAccess.value = granted
  if (!granted) {
    // Theme override wins, otherwise fall back to the built-in copy for the
    // active language, and finally to English
    const primaryLang = lang.value.split('-')[0]
    const { accessDenied } = defaultMessages[primaryLang] ?? defaultMessages.en
    const { title, message } = theme.value?.messages?.accessDenied ?? accessDenied
    $q.dialog({ title, message }).onOk(() => {
      window.location.href = theme.value.keycloak.fallbackUrl
    })
  }
})
</script>
