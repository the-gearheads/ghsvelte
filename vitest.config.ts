import {defineConfig} from 'vitest/config'
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [
    // @ts-ignore vscode really hates this
    sveltekit({ hot: !process.env.VITEST }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
})