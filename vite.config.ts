import react from '@vitejs/plugin-react';
import {defineConfig, splitVendorChunkPlugin} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  clearScreen: false,
  plugins: [react(), splitVendorChunkPlugin()],
});
