import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
  server: {
    port: 3000,
    proxy: {
      '/pnb/api': {
        target: 'https://auth-dev-stage.iserveu.online',
        changeOrigin: true,
        headers: {
          'User-Agent': 'PostmanRuntime/7.32.3'
        },
        rewrite: (path) => path.replace(/^\/pnb\/api/, '/pnb')
      },
      '/api/iserveu': {
        target: 'https://encr-decr.iserveu.online',
         changeOrigin: true,
        headers: {
          'User-Agent': 'PostmanRuntime/7.32.3'
        },
        rewrite: (path) => path.replace(/^\/api\/iserveu/, '')
      }
    }
  }
})
