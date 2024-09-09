import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',  // Esto está correcto
    setupFiles: './setupTests.js',
    globals: true,  // Asegúrate de que `globals` esté en true
  },
})