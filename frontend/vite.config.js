import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Torneos Deportivos',
        short_name: 'Torneos',
        theme_color: '#2D3748',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  server: {
    historyApiFallback: true,  // Crucial para React Router
    port: 5173,               // Puerto específico
    strictPort: true,         // Evita cambio automático de puerto
    open: true                // Abre navegador automáticamente
  },
  preview: {
    port: 5173,
    strictPort: true
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'   // Asegura que el build use tu index.html
    }
  }
});