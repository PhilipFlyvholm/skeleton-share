<script lang="ts">
	import type { ShareDrawerData } from '$lib/index.js';
	import { openShareDrawer } from '$lib/share/ShareDrawerState.svelte.js';
	import LightSwitch from './LightSwitch.svelte';
	import ThemeSelect from './ThemeSelect.svelte';

	const shareDrawer: ShareDrawerData = {
		title: 'Check out this cool libary',
		text: 'I just found this cool library called skeleton-share, that gives a native-like shareing on the web. Check it out!',
		url: 'https://github.com/PhilipFlyvholm/skeleton-share'
	};
</script>

<div class="container m-auto flex h-full flex-col items-center justify-center">
	<h1 class="gradient-heading h1 font-mono font-bold">Skeleton share</h1>
	<p>Native-like web sharing created with Skeleton and Svelte</p>
	<button type="button" class="btn my-2 preset-filled" onclick={() => openShareDrawer(shareDrawer)}
		>Open Share Drawer</button
	>
	<div class="fixed right-2 top-2 flex items-center justify-center gap-2">
		<ThemeSelect />
		<LightSwitch />
	</div>
</div>
