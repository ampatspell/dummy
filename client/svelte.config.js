import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  vitePlugin: {
    inspector: true,
  },
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '$dummy/*': 'src/dummy/*',
      '$dummy-shared/*': '../firebase/functions/src/shared/*',
    },
  },
};

export default config;
