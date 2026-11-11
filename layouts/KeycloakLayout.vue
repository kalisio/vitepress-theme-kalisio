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
const LOG_PREFIX = '[@kalisio/vitepress-theme]'
// Beyond this number of Keycloak attempts within the window, assume a redirect loop
const MAX_KEYCLOAK_ATTEMPTS = 4
const KEYCLOAK_ATTEMPTS_WINDOW = 60 * 1000
const KEYCLOAK_ATTEMPTS_KEY = 'kalisio-vitepress-theme:keycloak-attempts'
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
// Accepts an array or a comma-separated string, drops blank entries
function toList (value) {
  const list = Array.isArray(value) ? value : String(value ?? '').split(',')
  return list.map(item => String(item).trim()).filter(Boolean)
}
function passReferrer () {
  if (!document.referrer) return false
  const subdomains = toList(theme.value?.referrer?.subdomains)
  return subdomains.some(subdomain => document.referrer.includes(subdomain))
}
// Records an attempt and tells whether too many happened recently in this tab
function isKeycloakLooping () {
  try {
    const now = Date.now()
    const attempts = JSON.parse(sessionStorage.getItem(KEYCLOAK_ATTEMPTS_KEY) ?? '[]')
      .filter(timestamp => now - timestamp < KEYCLOAK_ATTEMPTS_WINDOW)
    attempts.push(now)
    sessionStorage.setItem(KEYCLOAK_ATTEMPTS_KEY, JSON.stringify(attempts))
    return attempts.length > MAX_KEYCLOAK_ATTEMPTS
  } catch {
    // Storage unavailable or corrupted: loops cannot be detected
    return false
  }
}
function resetKeycloakAttempts () {
  try {
    sessionStorage.removeItem(KEYCLOAK_ATTEMPTS_KEY)
  } catch {}
}
// Resolves to true (granted), false (denied) or null (redirecting to Keycloak)
async function passKeycloak () {
  if (isKeycloakLooping()) {
    console.error(`${LOG_PREFIX} Too many Keycloak attempts, probable redirect loop: check the Keycloak client configuration`)
    return false
  }
  const keycloakConfig = theme.value?.keycloak ?? {}
  let keycloak, authenticated
  try {
    keycloak = new Keycloak(keycloakConfig)
    authenticated = await keycloak.init({ onLoad: 'login-required', checkLoginIframe: false })
  } catch (error) {
    console.error(`${LOG_PREFIX} Keycloak init failed`, error)
    return false
  }
  // login-required: a non-authenticated user is being redirected to Keycloak
  if (!authenticated) return null
  resetKeycloakAttempts()
  const acceptedRoles = toList(keycloakConfig.roles)
  if (acceptedRoles.length === 0) return true
  return acceptedRoles.some(role => keycloak.hasRealmRole(role))
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
  // Redirecting to Keycloak: the page is about to be left
  if (granted === null) return
  hasAccess.value = granted
  if (!granted) {
    // Theme override wins, merged over the built-in copy for the active
    // language, which falls back to English
    const primaryLang = lang.value.split('-')[0]
    const { accessDenied } = defaultMessages[primaryLang] ?? defaultMessages.en
    const { title, message } = { ...accessDenied, ...theme.value?.messages?.accessDenied }
    // Without fallback URL there is nowhere to send the user: keep the message on screen
    const fallbackUrl = theme.value?.keycloak?.fallbackUrl
    $q.dialog({ title, message, persistent: true, ok: Boolean(fallbackUrl) })
      .onOk(() => { window.location.href = fallbackUrl })
  }
})
</script>