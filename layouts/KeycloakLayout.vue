<template>
  <div>
    <div v-if="useKeycloak">
      <div v-if="isAuthenticated">
        <div v-if="hasAccess">
          <Layout>
            <Content />
          </Layout>
        </div>
        <div v-else>
          <q-card class="full-width row justify-center">
            Vous n'etes pas autorisé à accéder à ce site !
          </q-card>
        </div>
      </div>
    </div>
    <Layout v-else>
      <Content />
    </Layout>
  </div>
</template>

<script setup>
import _ from 'lodash'
import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'
import Keycloak from 'keycloak-js'

// Data
const { theme } = useData()
const { Layout } = DefaultTheme
const useKeycloak = ref(theme.value.useKeycloak === 'true')
const isAuthenticated = ref(false)
const hasAccess = ref(false)

// Hooks
onMounted(() => {
  if (!useKeycloak.value) return
  if (theme.value.keycloak) {
    const keycloak = new Keycloak(theme.value.keycloak)
    keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then((auth) => {
      if (auth) {
        isAuthenticated.value = true
        const acceptedRoles = _.get(theme.value, 'keycloak.roles', [])
        if (_.isEmpty(acceptedRoles)) hasAccess.value = true
        else {
          const userRoles = _.get(keycloak, 'realmAccess.roles', [])
          if (!_.isEmpty(_.intersection(userRoles, acceptedRoles))) hasAccess.value = true
        }
      } else {
        window.location.reload()
      }
    })
  } else {
    console.error('Invalid SSO configutation: keycloak settings must be defined')
  }
})
</script>