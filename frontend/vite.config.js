import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative assets work on GitHub Pages
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        events: resolve(__dirname, 'events.html'),
        schedule: resolve(__dirname, 'schedule.html'),
        gallery: resolve(__dirname, 'gallery.html'),
        sangeet: resolve(__dirname, 'sangeet.html'),
        packages: resolve(__dirname, 'packages.html'),
        location: resolve(__dirname, 'location.html'),
        student: resolve(__dirname, 'student.html'),
        admin: resolve(__dirname, 'admin.html'),
      },
      output: {
        entryFileNames: 'assets/ethos-app-v20260819-cb1908-[hash].js',
        chunkFileNames: 'assets/ethos-chunk-v20260819-cb1908-[hash].js',
        assetFileNames: 'assets/ethos-style-v20260819-cb1908-[hash].[ext]'
      }
    },
  },
})
