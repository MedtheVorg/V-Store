import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/__tests__/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // this code configures Vite to listen on all network
  // interfaces within a Docker container, enabling access to
  //  the application from outside the container.
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
