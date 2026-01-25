import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // 部署到 https://amber2713.github.io/wangzijian/ 时，必须配置此项
  base: '/wangzijian/', 
  
  plugins: [react()],
  
  build: {
    // 确保打包输出目录正确（默认就是 dist）
    outDir: 'dist',
    // 资源存放的文件夹
    assetsDir: 'assets',
  },
})
