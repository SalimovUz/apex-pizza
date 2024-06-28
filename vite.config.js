import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@routes", replacement: "/src/router/routes.jsx" },
      { find: "@pages", replacement: "/src/pages/index.jsx" },
      { find: "@service", replacement: "/src/service/index.jsx" },
      { find: "@public", replacement: "../../../public/images" },
    ],
  },
});
