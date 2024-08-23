import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 配置服务器端口
    proxy: {
      '/api': {
        target: 'http://43.133.65.177:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/ai')
      }
    }
  }
})
