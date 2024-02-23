<script lang="ts">
	import { shareDrawerSettings } from '$lib/share/ShareDrawerSettings.js';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
	const shareDrawer = shareDrawerSettings(
		{
			title: 'Check out this cool libary',
			text: 'I just found this cool library called skeleton-share, that gives a native-like shareing on the web. Check it out!',
			url: 'https://github.com/PhilipFlyvholm/skeleton-share'
		}
	);
</script>

<div class="container m-auto flex h-full flex-col items-center justify-center">
	<h1 class="h1 font-bold font-mono">Skeleton share</h1>
	<p>Native-like web sharing created with Skeleton and Svelte</p>
	<button
		type="button"
		class="variant-filled-primary btn my-2"
		on:click={() => drawerStore.open(shareDrawer)}>Open Share Drawer</button
	>
</div>
