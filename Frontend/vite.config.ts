import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true,
    hmr: {
      overlay: true,
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Never ship sourcemaps: Vercel does not set NODE_ENV for the build step,
    // so the previous `NODE_ENV !== 'production'` check leaked maps to prod.
    sourcemap: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'project-detail': resolve(__dirname, 'project-detail.html'),
      },
      output: {
        // Function form: the object form hoisted React into the three chunk
        // (because @react-three/fiber depends on React) and emitted an empty
        // react-vendor. Order matters — react is matched before three.
        manualChunks(id) {
          // Vite's __vitePreload helper is not in node_modules. Left unassigned,
          // Rollup parked it inside three-vendor, which made the 866 kB three
          // chunk a STATIC dependency of the entry purely to borrow one helper
          // function -- so it stayed modulepreloaded despite the lazy imports.
          if (id.includes('vite/preload-helper')) return 'react-vendor'
          if (!id.includes('node_modules')) return
          if (/node_modules\/(react|react-dom|scheduler)\//.test(id)) return 'react-vendor'
          if (/node_modules\/(three|@react-three)\//.test(id)) return 'three-vendor'
        },
      },
    },
  },
})
