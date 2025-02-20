import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton, contentPath } from '@skeletonlabs/skeleton/plugin';
import * as themes from '@skeletonlabs/skeleton/themes';

const config = {
	// 2. Opt for dark mode to be handled via the class method
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', contentPath(import.meta.url, 'svelte')],
	theme: { extend: {} },
	plugins: [
		skeleton({
			// NOTE: each theme included will increase the size of your CSS bundle
			themes: [themes.cerberus, themes.rose]
		})
	]
} satisfies Config;

export default config;
