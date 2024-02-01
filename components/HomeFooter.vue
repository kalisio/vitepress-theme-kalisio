<template>
  <div style="margin-top: 50px; ">
    <div v-if="hasTrustLogo">
      <h4 class="title-footer">Trusted by</h4>
      <div style="display: flex; align-items: center; justify-content: center">
        <a v-for="trustLogo in trustLogos" :href="trustLogo.link"><img :src="trustLogo.imageLink"></a>
      </div>
      <br />
    </div>
    <h3 class="title-footer">Sponsored by</h3>
    <a href="https://kalisio.com">
      <img class="logo-footer" :src="computedLogo">
    </a>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import _ from 'lodash'

// Data
const { theme, isDark } = useData()

// computed
const computedLogo = computed(() => {
  if (isDark.value) return 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-white-256x84.png'
  return 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-black-256x84.png'
})
const hasTrustLogo = computed(() => {
  if (_.has(theme.value, 'trustLogos')) return true
  return false
})
const trustLogos = computed(() => {
  return theme.value.trustLogos
})
</script>
<style>
  .title-footer {
    text-align: center;
    font-size: 20px;
    font-weight: 700
  }
  .logo-footer {
    margin-left: auto;
    margin-right: auto
  }
</style>*