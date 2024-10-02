import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react-swc'



// https://vitejs.dev/config/

export default defineConfig({

  plugins: [react()],

  server: {

    host: true, // 외부 네트워크에서 접속할 수 있도록 설정

    port: 5173 // 원하는 포트 설정 (기본값 5173)

  }

})