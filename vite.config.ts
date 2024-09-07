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
	server: {
    warmup: {
      clientFiles: [
				'/.svelte-kit/generated/root.svelte',
				'/node_modules/@sveltejs/kit/src/runtime/server/utils.js',
				'/node_modules/@sveltejs/kit/src/runtime/server/page/actions.js',
				'/node_modules/@sveltejs/kit/src/runtime/server/cookie.js',
				'/node_modules/@sveltejs/kit/src/runtime/server/page/render.js',
        '/src/app.pcss',
				'/src/app.pcss?inline=',
        '/src/routes/(frontend)/+layout.svelte?svelte&type=style&lang.css',
				'/src/routes/(frontend)/+layout.svelte'
      ],
    },
  },
});
