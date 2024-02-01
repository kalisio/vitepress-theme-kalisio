<template>
  <a :href="url" target="_blank">
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
    default: ''
  },
  urlTemplate: {
    type: String,
    required: true
  },
  jwt: {
    type: Boolean,
    default: true
  }
})

// Data
const { theme } = useData()
const url = ref('')

// Hooks
onMounted(async () => {
  const _ = await import('lodash')
  const moment = await import('moment')
  const compiler = _.template(props.urlTemplate)
  const context = { moment: moment.default }
  context.domain = theme.value.domain
  context.jwt = theme.value.jwt
  url.value = compiler(context)
})
</script>
