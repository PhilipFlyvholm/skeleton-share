<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import ShareDrawer from '$lib/share/ShareDrawer.svelte';
	import { shareId } from '$lib/share/ShareDrawerSettings.js';

	const drawerStore = getDrawerStore();
	let drawer: HTMLElement | null = null;
	let initial = { x: 0, y: 0, height: 0 };
	function handleMouseDown(e: CustomEvent<MouseEvent>) {
		const drawerContent = document.querySelector('.drawer-content');
		if (drawerContent && drawerContent.contains(e.detail.target as HTMLElement)) return;
		drawer = document.querySelector('.drawer');
		if (!drawer) return;
		e.preventDefault();
		initial = {
			x: e.detail.clientX,
			y: e.detail.clientY,
			height: drawer.getBoundingClientRect().height
		};
		drawer.style.transition = 'transform 0.3s ease-out';
		drawer.style.overflow = 'unset';
		drawer.style.transform = `translateY(0)`;
	}

	function handleMouseMove(e: MouseEvent) {
		if (!drawer) return;

		if (initial.y - e.clientY < 0) {
			drawer.style.transform = `translateY(${e.clientY - initial.y}px)`;
			drawer.style.height = `${initial.height}px`;
		} else {
			if(initial.y > window.innerHeight) window.innerHeight = initial.y;
			if(initial.y < 0) initial.y = 0;
			let diff = initial.y - e.clientY;

			console.log('before', diff)
			if (diff > 0) {
				diff = (diff / (window.innerHeight - initial.height)) * initial.height * 0.2;
			} 
			if(diff > initial.height*0.2){
				diff = initial.height*0.2;
			}
			console.log('after', diff);

			drawer.style.transform = `translateY(${-diff}px)`;
		}
	}

	function handleMouseUp(e: MouseEvent) {
		if (!drawer) return;
		e.preventDefault();
		if (initial.y - e.clientY < initial.height / 2) {
			drawerStore.close();
		} else {
			drawer.style.transform = `translateY(0)`;
		}
		drawer = null;
		initial = { x: 0, y: 0, height: 0 };
	}

	function handleBackdrop(e: CustomEvent<MouseEvent>) {
		if (!drawer) return;
		e.preventDefault();
	}

	function handleSelect(e: Event) {
		if (!drawer) return;
		e.preventDefault();
	}
</script>

<svelte:window
	on:mouseup={handleMouseUp}
	on:mousemove={handleMouseMove}
	on:selectstart={handleSelect}
/>
<Drawer on:drawer={handleMouseDown} on:backdrop={handleBackdrop}>
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