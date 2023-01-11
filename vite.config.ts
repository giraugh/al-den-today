import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import topLevelAwait from 'vite-plugin-top-level-await'
import wasm from 'vite-plugin-wasm'

const config: UserConfig = {
	plugins: [
		sveltekit(),
		topLevelAwait(),
		wasm(),
	]
};

export default config;
