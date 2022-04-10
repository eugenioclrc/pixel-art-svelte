// import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import adapter from "@sveltejs/adapter-static";


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	// preprocess: preprocess(),

	tsconfigFile: './tsconfig.json',
	compilerOptions: {
		enableSourcemap: true
	},
	preprocess: [
		preprocess({
			sourceMap: true,
			postcss: true
		})
	],

	kit: {
		adapter: adapter({
			pages: "build",
      assets: "build",
      fallback: null,
    }),
    paths: {
      // YOUR github repository name
      base: "/pixel-art-svelte",
    }
	}
};

export default config;
