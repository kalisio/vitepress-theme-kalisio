<template>
  <div>
    <iframe id="maps" title="Maps" allow="geolocation *" allowfullscreen frameBorder="0" :style="cssStyle" :src="source"></iframe>
  </div>
</template>
<script setup>
import { onMounted } from 'vue'
import { useData } from 'vitepress'

// Props
const props = defineProps({
  source: {
    type: String,
    default: 'https://kano.dev.kalisio.xyz'
  },
  cssStyle: {
    type: String,
    default: 'width: 100%; height: 50vh'
  }
})

// Data
const { theme } = useData()

// Hooks
onMounted(() => {
  const maps = document.getElementById('maps').contentWindow
  if (typeof postRobot === 'undefined') {
    let postRobotScript = document.createElement('script')
    postRobotScript.setAttribute('src',"https://cdn.jsdelivr.net/npm/post-robot@10.0.42/dist/post-robot.min.js")
    postRobotScript.onload = () => {
      postRobot.on('maps-ready', () => {
        if (props.token !== '') {
          postRobot.send(maps, 'setLocalStorage', { 'kano-jwt': theme.value.jwt })
        }
      })
    }
    document.head.appendChild(postRobotScript)
  }
})
</script>