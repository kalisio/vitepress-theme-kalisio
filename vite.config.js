import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { builtinModules } from 'node:module'
import { readFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  root: __dirname,
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: true,
    lib: {
      entry: {
        index: 'index.js',
        sidebar: 'src/sidebar.js'
      },
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.mjs`
    },
    rollupOptions: {
      external: [
        ...builtinModules,
        ...builtinModules.map((m) => `node:${m}`),
        ...Object.keys(packageJson.dependencies ?? {}),
        ...Object.keys(packageJson.devDependencies ?? {}),
        ...Object.keys(packageJson.peerDependencies ?? {}),
        'vitepress/theme',
        'vitepress-openapi/client',
        'vitepress-openapi/dist/style.css'
      ]
    }
  }
})
