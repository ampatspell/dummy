import adapter from '@sveltejs/adapter-auto';
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
      '$base/*': 'src/base/*',
    },
  },
};

export default config;
