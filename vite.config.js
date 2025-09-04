import { fileURLToPath, URL } from "node:url";
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: "",
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
  /*
     devOptions: {
        enabled: true,
      },
    */
      manifest: {
        name: 'Wavemaker Cards version 5',
        short_name: 'WavemakerCards5',
        start_url: './',
        scope: './',
        display: 'standalone',
        background_color: '#212121',
        theme_color: '#212121',
        icons: [
          {
            src: './icons/192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './icons/512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        file_handlers: [
          {
            action: './index.html',
            accept: {
              'application/json': ['.wmc'],
            },
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
            },
          },
        ],
      },
    }),
    ],
  server: {
    host: '0.0.0.0',  // Add this line
    port: 5173,       // Add this line (Vite's default port)
  },
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
});
