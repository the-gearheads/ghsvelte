import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	// change devOptions.enabled to true to test web worker in dev
	plugins: [sveltekit(), purgeCss(), SvelteKitPWA({ registerType: 'autoUpdate', devOptions: { enabled: false }, kit: { includeVersionFile: true }})],
	build: {
		sourcemap: true,
		rollupOptions: {
			external: [],
		}
	},
	css: {
		devSourcemap: true,
	},
});
