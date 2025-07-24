// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ This is needed so Netlify serves your app from root
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
