import { defineConfig } from 'vite'

export const baseConfig = defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    minify: true
  }
})
