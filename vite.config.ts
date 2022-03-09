import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import packageJson from './package.json'


const nowTs:string = new Date().toISOString();
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@':  path.resolve(__dirname, './src'),
    }
  },
  define : {
    APP_VERSION: JSON.stringify(packageJson.version),
    NOW_TS: JSON.stringify(nowTs)
  },
  plugins: [reactRefresh()]
})
