import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    host: '0.0.0.0', // 모바일 접근을 위해 설정했던 부분
    allowedHosts: [
      'begrudgingly-homostyled-ping.ngrok-free.dev', // ngrok에서 받은 URL
    ],
  }
})
