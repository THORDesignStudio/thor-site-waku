import { defineConfig } from 'waku/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Externalize Three.js related packages for SSR to avoid ESM/CJS issues
      noExternal: [],
      external: [
        'three',
        '@react-three/fiber',
        '@react-three/drei',
        'detect-gpu',
      ],
    },
    optimizeDeps: {
      // Include these for client-side optimization
      include: ['three', '@react-three/fiber', '@react-three/drei'],
    },
  },
});
