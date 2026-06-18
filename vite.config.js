import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { builtinModules } from 'node:module'
import { readFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig, mergeConfig } from 'vite'
import { baseConfig } from './vite.base-config.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default mergeConfig(baseConfig, defineConfig({
  root: __dirname,
  plugins: [vue()],
  build: {
    lib: {
      entry: {
        index: 'index.js'
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.mjs`
    },
    rollupOptions: {
      external: [
        ...builtinModules,
        ...builtinModules.map((m) => `node:${m}`),
        ...Object.keys(packageJson.dependencies ?? {}),
        ...Object.keys(packageJson.peerDependencies ?? {}),
        'vitepress/theme'
      ]
    }
  }
}))
