import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 这里的 base 必须对应你 GitHub Pages 的子路径
  // 结尾的斜杠 / 非常重要，不能漏掉
  base: '/wangzijian/project00/',

  build: {
    // 确保打包出的资源路径是相对路径
    outDir: 'dist',
    assetsDir: 'assets',
  },
  
  server: {
    // 本地开发时的配置（可选）
    port: 5173,
  }
})
