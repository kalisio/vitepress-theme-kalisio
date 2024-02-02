<template>
  <a :href="href" target="_blank">
    {{ text }}
    <i class="las la-external-link-square-alt"></i>
  </a>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

// Props
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  hrefTemplate: {
    type: String,
    required: true
  },
  domainPath: {
    type: String,
    default: 'domain'
  },
  jwtPath: {
    type: String,
    default: 'jwt'
  }
})

// Data
const { theme } = useData()
const href = ref('')

// Hooks
onMounted(async () => {
  const _ = await import('lodash')
  const moment = await import('moment')
  const compiler = _.template(props.hrefTemplate)
  const context = { moment: moment.default }
  context.domain = _.get(theme.value, props.domainPath)
  context.jwt = _.get(theme.value, props.jwtPath)
  href.value = compiler(context)
})
</script>