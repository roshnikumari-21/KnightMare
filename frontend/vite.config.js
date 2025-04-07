import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    host: '0.0.0.0', // Allow access from any device
    port: 5173, // Change if needed
    strictPort: true, // Ensure the same port is used
    allowedHosts: [
      'campbell-ratios-madness-reviews.trycloudflare.com' // Add your Cloudflare Tunnel URL here
    ],
  }
})
