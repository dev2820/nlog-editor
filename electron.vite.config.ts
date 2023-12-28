import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: [
        { find: '@', replacement: resolve('src/renderer/src') },
        {
          find: '@style',
          replacement: resolve('src/renderer/styled-system')
        }
      ]
    },
    server: {
      watch: {
        usePolling: true
      }
    },
    plugins: [react()]
  }
});
