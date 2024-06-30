import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0'   
  },
  resolve: {
    alias: [
      {
        find: 'react-query/devtools',
        replacement: 'react-query/es/devtools/index',
      },
    ],
  },
})
