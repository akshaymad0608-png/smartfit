import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon.svg', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'FitSmart — Smarter Fitness. Better Health.',
        short_name: 'FitSmart',
        description:
          'Free fitness platform with workouts, nutrition, calculators and an AI coach.',
        theme_color: '#3B82F6',
        background_color: '#FAFAF8',
        display: 'standalone',
        id: '/',
        start_url: '/?source=pwa',
        scope: '/',
        lang: 'en',
        orientation: 'portrait',
        categories: ['health', 'fitness', 'lifestyle'],
        // Chrome/Android needs real PNG icons (192 + 512) to offer install.
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
          { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
        ],
        shortcuts: [
          { name: 'Calculators', url: '/calculators', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
          { name: 'Workouts', url: '/workouts', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
          { name: 'AI Coach', url: '/ai-coach', icons: [{ src: '/icon-192.png', sizes: '192x192' }] },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/index.html',
        // Videos are streamed (never precached); keep the 3D chunk allowed.
        maximumFileSizeToCacheInBytes: 3 * 1024 * 1024,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          query: ['@tanstack/react-query'],
          forms: ['react-hook-form', 'zod'],
        },
      },
    },
  },
});
