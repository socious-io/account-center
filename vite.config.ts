import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import wasm from 'vite-plugin-wasm';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: env.VITE_BASE_PATH || '/',
    resolve: {
      alias: {
        src: path.resolve(__dirname, 'src'),
      },
    },
    plugins: [react(), tsconfigPaths(), nodePolyfills(), wasm()],
    optimizeDeps: { exclude: [`@ionic/pwa-elements/loader`] },
    define: {
      global: 'window', // Polyfill global as window
    },
  };
});
