import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import bunSingle from 'vite-plugin-bun-single'

// https://vite.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [
    react(),
    bunSingle({
      distDir: 'dist',
      outFile: 'assets.generated.ts',
      generateServer: true,
      serverFile: 'server.ts'
    })
  ]
})
