import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    alias: {
      '$icons/*': 'src/icons/*',
      '$components/*': 'src/components/*',
      '$server/*': 'src/server/*',
    },
  },
};

export default config;
