import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { builtinModules } from 'node:module'
import { readFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))
const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'))

// Only runtime dependencies and peers are left to the consumer. A devDependency
// imported by the theme is bundled instead of becoming an unresolvable import.
const deps = [
  ...Object.keys(packageJson.dependencies ?? {}),
  ...Object.keys(packageJson.peerDependencies ?? {})
]

// Matches packages and their subpaths (vitepress/theme, quasar/dist/quasar.css...)
const isExternal = (id) =>
  id.startsWith('node:') ||
  builtinModules.includes(id) ||
  deps.some((dep) => id === dep || id.startsWith(`${dep}/`))

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
      fileName: (format, entryName) => `${entryName}.mjs`,
      // Vite >= 6 names the CSS after the package, keep the published ./style.css path
      cssFileName: 'style'
    },
    rolldownOptions: {
      external: isExternal,
      output: {
        // In library mode Vite extracts the CSS without importing it from the JS:
        // make the theme load its own styles so that consumers don't have to
        banner: (chunk) => chunk.fileName === 'index.mjs' ? "import './style.css';" : ''
      }
    }
  }
})
