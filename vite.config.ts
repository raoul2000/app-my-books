import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import packageJson from './package.json'


// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, './src'),
    }
  },
  define : {
    APP_VERSION: JSON.stringify(packageJson.version)
  },
  plugins: [reactRefresh()]
})
