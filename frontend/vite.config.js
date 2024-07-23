/* eslint-disable no-undef */
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    plugins: [react()],
    server: {
      watch: {
        usePolling: true,
      },
      host: true, // needed for docker port mapping to work
      strictPort: true,
      port: 20011,
      proxy: {
        "/api": {
          target: process.env.VITE_PROXY_TARGET,
          changeOrigin: true
        }
      }
    }
  });
}