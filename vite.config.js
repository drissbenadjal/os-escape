import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Port sur lequel votre application sera disponible
    open: true, // Ouvre automatiquement le navigateur lorsque le serveur démarre
    host: '0.0.0.0', // Permet à l'application d'être accessible depuis n'importe quelle adresse IP sur votre réseau local
  },
})
