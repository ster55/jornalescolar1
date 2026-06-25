import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // Redireciona /api para o backend Spring Boot em desenvolvimento
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        // Se o backend não usar /api no prefixo, descomente a linha abaixo:
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
})