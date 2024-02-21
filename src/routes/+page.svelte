<script lang="ts">
	import { shareDrawerSettings, shareId } from '$lib/share/ShareDrawerSettings.js';
	import { getDrawerStore } from '@skeletonlabs/skeleton';

	const drawerStore = getDrawerStore();
</script>

<div class="container m-auto flex h-full flex-col items-center justify-center">
	<h1 class="h1">Skeleton share</h1>
	<p>Better web sharing made with the skeleton drawer</p>
	<button
		type="button"
		class="variant-filled-primary btn my-2"
		on:click={() => drawerStore.open(shareDrawerSettings({
            title: 'Share this page',
            text: 'This is a description',
            url: 'https://skeleton.skeletonlabs.com',
        }))}>Open Share Drawer</button
	>
</div>
