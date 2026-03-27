import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Three.js in its own cached chunk (~873KB, loaded lazily)
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          // GSAP in own chunk
          gsap: ['gsap'],
          // React runtime
          vendor: ['react', 'react-dom'],
        },
      },
    },
    // Silence the size warning — Three.js is intentionally large
    chunkSizeWarningLimit: 1000,
  },
})
