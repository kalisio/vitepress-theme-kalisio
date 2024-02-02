<template>
  <a :href="url" target="_blank">
    {{ text }}
    <i class="las la-external-link-square-alt"></i>
  </a>
</template>

<script setup>
import _ from 'lodash'
import moment from 'moment'
import { ref, onMounted } from 'vue'
import { useData } from 'vitepress'

// Props
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  urlTemplate: {
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
const url = ref('')

// Hooks
onMounted(() => {
  const compiler = _.template(props.urlTemplate)
  console.log(compiler)
  const context = { moment }
  context.domain = _.get(theme.value, props.domainPath)
  context.jwt = _.get(theme.value, props.jwtPath)
  console.log(context)
  url.value = compiler(context)
})
</script>
