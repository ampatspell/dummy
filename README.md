# dummy

```
$ npx sv create
$ cd dummy/tools
$ npm run link -- ../../amateurinmotion
```

``` ts
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
			'$lib/*': 'src/lib/*',
			'$base/*': 'src/base/*',
			'$shared/*': '../dummy/firebase/functions/src/shared/*',
		}
	}
};

export default config;
```

``` ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	css: {
    preprocessorOptions: {
      scss: {
        api: 'modern',
      },
    },
  },
	plugins: [sveltekit()]
});
```
