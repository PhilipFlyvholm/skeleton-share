<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import ShareDrawer from '$lib/share/ShareDrawer.svelte';
	import { shareId } from '$lib/share/ShareDrawerSettings.js';
	import { initDrawer } from './ShareDrawerHandler.js';

	const drawerStore = getDrawerStore();
	let drawerEl:Drawer;
	$: initDrawer(drawerEl, drawerStore);
</script>

<Drawer bind:this={drawerEl}>
	{#if $drawerStore.id === shareId}
		<ShareDrawer />
	{:else}
		<!-- Fallback Error -->
		<div class="flex h-full w-full items-center justify-center">
			<div class="space-y-2 text-center">
				<p>Hmm... It does not seem like I should have showed you this?</p>
				<button class="btn-primary btn" on:click={() => drawerStore.close()}>Close</button>
			</div>
		</div>
	{/if}
</Drawer>

<style>
	:global(.drawer){
		overflow: unset;
	}
	:global(.drawer::after){
		position: absolute;
		top: 100%;
		bottom: initial;
		left: 0;
		right: 0;
		content: '';
		background: inherit;
		height: 100%;
	}
</style>