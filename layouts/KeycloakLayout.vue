<template>
  <div v-if="hasAccess">
    <Layout />
  </div>
</template>

<script setup>
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import Keycloak from 'keycloak-js'

// Data
const { theme } = useData()
const { Layout } = DefaultTheme
const $q = useQuasar()
const hasAccess = ref(true)

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

// Hooks
onMounted(async () => {
  const useReferrer = theme.value.useReferrer === true || theme.value.useReferrer === 'true'
  const useKeycloak = theme.value.useKeycloak === true || theme.value.useKeycloak === 'true'
  if (useReferrer || useKeycloak) {
    if (useReferrer) hasAccess.value = passReferrer()
    if (!hasAccess.value && useKeycloak) hasAccess.value = await passKeycloak()
    if (!hasAccess.value) {
      $q.dialog({
        title: 'Accès refusé',
        message: 'Vous n\'êtes pas autorisé à acceder à ce site'
      }).onOk(() => {
        window.location.href = theme.value.keycloak.fallbackUrl
      })
    }
  }
})
</script>