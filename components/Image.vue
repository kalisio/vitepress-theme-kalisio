<template>
  <div>
    <img v-if="isDark" :src="darkSrc">
    <img v-else :src="src">
  </div>
</template>

<script setup>
import { useData } from 'vitepress'

// Props
const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  darkSrc: {
    type: String,
    default: ''
  }
})

// Data
const { isDark } = useData()
</script>
