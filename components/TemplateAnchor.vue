<template>
  <a :href="href" target="_blank">
    <div style="overflow-wrap: break-word;">
      {{ text }}
      <i class="las la-external-link-square-alt"></i>
    </div>
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
  // Intentional dynamic import: _.template compiles via Function() and
  // depends on theme.value (runtime domain/jwt) → must stay client-side,
  // out of SSR/build. Do NOT switch back to a static import.
  const { template, get } = await import('lodash-es')
  const moment = await import('moment')
  const compiler = template(props.hrefTemplate)
  const context = { moment }
  context.domain = get(theme.value, props.domainPath)
  context.jwt = get(theme.value, props.jwtPath)
  href.value = compiler(context)
})
</script>
