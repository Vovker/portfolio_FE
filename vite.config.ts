import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';

const resolveRoot = (path: string) => {
  const root = resolve(__dirname, 'src');
  return resolve(root, path);
};
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolveRoot(''),
      '@assets': resolveRoot('assets'),
      '@components': resolveRoot('components')
    }
  }
});
