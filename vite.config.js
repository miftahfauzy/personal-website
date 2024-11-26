import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  base: '/personal-website/',
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Miftah Fauzy - IT Professional Portfolio',
        short_name: 'Miftah Portfolio',
        description: 'Professional portfolio showcasing 25+ years of IT experience',
        theme_color: '#2563eb',
        icons: [
          {
            src: '/assets/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    open: true
  }
});
