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
  console.log(document.referrer)
  if (!document.referrer) return false
  let subdomains = _.get(theme.value, 'referrer.subdomains', [])
  console.log(subdomains)
  if (!Array.isArray(subdomains)) {
    console.log('array', subdomains)
    subdomains = _.split(subdomains, ',')
  }
  console.log(subdomains)
  let pass = false
  _.forEach(subdomains, subdomain => {
    if (document.referrer.contains(subdomain)) {
      pass = true
      return false
    }
  })
  console.log(pass)
  return pass
}
function passKeycloak () {
  const keycloak = new Keycloak(theme.value.keycloak)
  keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then((auth) => {
    if (auth) {
      const acceptedRoles = _.get(theme.value, 'keycloak.roles', [])
      if (_.isEmpty(acceptedRoles)) return true
      // check roles
      const userRoles = _.get(keycloak, 'realmAccess.roles', [])
      if (!_.isEmpty(_.intersection(userRoles, acceptedRoles))) return true
      return false
    } else {
      window.location.reload()
    }
  })
}

// Hooks
onMounted(() => {
  const useReferrer = (_.isBoolean(theme.value.useReferrer) && theme.value.useReferrer) || theme.value.useReferrer === 'true'
  const useKeycloak = (_.isBoolean(theme.value.useKeycloak) && theme.value.useKeycloak) || theme.value.useKeycloak === 'true'
  console.log(useReferrer, useKeycloak)
  if (useReferrer) {
    hasAccess.value = passReferrer()
  }
  if (!hasAccess.value) {
    if (useKeycloak) {
      hasAccess.value = passKeycloak()
      hasAccess.value = true
    } else {
      hasAccess.value = !useReferrer
    }
  }
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