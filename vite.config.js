import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ✅ Needed for correct relative paths after build
  server: {
    port: 3000, // ✅ Correct number, frontend usually on 3000
    proxy: {
      '/api': {
        target: "https://chatify-backend.onrender.com", // ✅ Frontend proxies to backend in dev
        changeOrigin: true,
      },
    },
  },
})
