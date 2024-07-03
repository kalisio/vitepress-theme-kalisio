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
  _.forEach(subdomains, subdomain => {
    if (document.referrer.includes(subdomain)) {
      hasAccess.value = true
      return false
    }
  })
}
function passKeycloak () {
  const keycloak = new Keycloak(theme.value.keycloak)
  keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then((auth) => {
    if (auth) {
      const acceptedRoles = _.get(theme.value, 'keycloak.roles', [])
      if (_.isEmpty(acceptedRoles)) hasAccess.value = true
      else {
        // check roles
        const userRoles = _.get(keycloak, 'realmAccess.roles', [])
        if (!_.isEmpty(_.intersection(userRoles, acceptedRoles))) hasAccess.value = true
      }
    } else {
      window.location.reload()
    }
  })
}

// Hooks
onMounted(() => {
  const useReferrer = (_.isBoolean(theme.value.useReferrer) && theme.value.useReferrer) || theme.value.useReferrer === 'true'
  const useKeycloak = (_.isBoolean(theme.value.useKeycloak) && theme.value.useKeycloak) || theme.value.useKeycloak === 'true'
  if (useReferrer) passReferrer()
  if (!hasAccess.value && useKeycloak) passKeycloak()
  if (!hasAccess.value) {
    // otherwise
    $q.dialog({
      title: 'Accés refusé',
      message: 'Vous n\'êtes pas autorisé à accèder à ce site'
    }).onOk(() => {
      window.location.href=theme.value.keycloak.fallbackUrl
    })
  }
})
</script>