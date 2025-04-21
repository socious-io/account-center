import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
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
    plugins: [react(), tsconfigPaths()],
    optimizeDeps: { exclude: [`@ionic/pwa-elements/loader`] },
  };
});
