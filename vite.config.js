
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
     
      '/tm': {
        target: 'https://app.ticketmaster.com/discovery/v2',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/tm/, '')  
      }
    }
  }
})
