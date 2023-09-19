<template>
  <a :href="url" target="_blank">
    {{ text }}
    <i class="las la-external-link-square-alt"></i>
  </a>
</template>

<script setup>
import _ from 'lodash'
import moment from 'momnet'
import { ref } from 'vue'

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
const url = ref('')

// Immediate
const compiler = _.template(props.urlTemplate)
let context = { moment }
context.jwt = this.$site.themeConfig.jwt // Add any access token
url.value = compiler(context)
</script>
