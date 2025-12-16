import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'; // 🚀 svgr 가져오기

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
})
