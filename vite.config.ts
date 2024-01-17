import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default defineConfig({
	plugins: [sveltekit(), purgeCss(), SvelteKitPWA({ registerType: 'prompt', devOptions: { enabled: true }, kit: { includeVersionFile: true }})],
	build: {
		sourcemap: true,
	},
	css: {
		devSourcemap: true,
	},
});
