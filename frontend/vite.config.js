import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()], // Enables React plugin for Vite
  base: './', // Use relative paths for assets
  build: {
    outDir: 'dist', // Output directory for build
    rollupOptions: {
      input: './index.html', // Entry point for the build
    },
  },
});