<template>
  <div v-if="hasAccess">
    <Layout>
      <Content />
    </Layout>
  </div>
</template>

<script setup>
import _ from 'lodash'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import Keycloak from 'keycloak-js'

// Data
const { theme } = useData()
const { Layout } = DefaultTheme
const $q = useQuasar()
const hasAccess = ref(false)

// Functions
function passReferrer () {
  if (!document.referrer) return false
  let subdomains = _.get(theme.value, 'referrer.subdomains', [])
  if (!Array.isArray(subdomains)) subdomains = _.split(subdomains, ',')
  let result = false
  _.forEach(subdomains, subdomain => {
    if (document.referrer.includes(subdomain)) {
      result = true
      return false
    }
  })
  return result
}
async function passKeycloak () {
  return new Promise((resolve, reject) => {
    const keycloak = new Keycloak(theme.value.keycloak)
    keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then((auth) => {
      if (auth) {
        const acceptedRoles = _.get(theme.value, 'keycloak.roles', [])
        if (_.isEmpty(acceptedRoles)) resolve(true)
        // check roles
        const userRoles = _.get(keycloak, 'realmAccess.roles', [])
        if (!_.isEmpty(_.intersection(userRoles, acceptedRoles))) resolve(true)
        resolve(false)
      } else {
        window.location.reload()
      }
    })
  })
}

// Hooks
onMounted(async () => {
  const useReferrer = (_.isBoolean(theme.value.useReferrer) && theme.value.useReferrer) || theme.value.useReferrer === 'true'
  const useKeycloak = (_.isBoolean(theme.value.useKeycloak) && theme.value.useKeycloak) || theme.value.useKeycloak === 'true'
  if (useReferrer) hasAccess.value = passReferrer()
  if (!hasAccess.value && useKeycloak) hasAccess.value = await passKeycloak()
  if (!hasAccess.value) {
    $q.dialog({
      title: 'Accés refusé',
      message: 'Vous n\'êtes pas autorisé à accèder à ce site'
    }).onOk(() => {
      window.location.href=theme.value.keycloak.fallbackUrl
    })
  }
})
</script>