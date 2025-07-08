import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/lib': '/src/lib',
      '@/stores': '/src/stores',
      '@/providers': '/src/providers',
      '@/constants': '/src/constants',
      '@/app': '/src/app',
      '@/common': '/src/common',
      '@/styles': '/src/styles',
      '@/assets': '/src/assets',
    },
  },
})
