import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [
    vue(),
    vueDevTools()
  ],
  
  server: {
    host: '0.0.0.0', // Allows access from network (phone, other devices)
    port: 5173,
    allowedHosts: [
      'boastful-blaming-crushing.ngrok-free.dev'
    ]
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})