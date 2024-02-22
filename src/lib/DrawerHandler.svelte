<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import ShareDrawer from '$lib/share/ShareDrawer.svelte';
	import { shareId } from '$lib/share/ShareDrawerSettings.js';

	const drawerStore = getDrawerStore();
	let drawer: HTMLElement | null = null;
	let initial = { x: 0, y: 0, height: 0 };
	function handleMouseDown(e: CustomEvent<MouseEvent> | TouchEvent) {
		
		const drawerContent = document.querySelector('.drawer-content');
		if (drawerContent && drawerContent.contains(e.target as HTMLElement)) return;
		drawer = document.querySelector('.drawer');
		if (!drawer) return;
		if(!(e instanceof TouchEvent)) e.preventDefault();
		const clientX = e instanceof TouchEvent ? e.touches[0].clientX : e.detail.clientX;
		const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.detail.clientY;
		initial = {
			x: clientX,
			y: clientY,
			height: drawer.getBoundingClientRect().height
		};
		drawer.style.transition = 'transform 0.1s ease-out';
		drawer.style.overflow = 'unset';
		drawer.style.transform = `translateY(0)`;
	}

	function handleMouseMove(e: MouseEvent | TouchEvent) {
		if (!drawer) return;
		const clientY = e instanceof TouchEvent ? e.touches[0].clientY : e.clientY;
		if (initial.y - clientY < 0) {
			drawer.style.transform = `translateY(${clientY - initial.y}px)`;
			drawer.style.height = `${initial.height}px`;
		} else {
			if(initial.y > window.innerHeight) window.innerHeight = initial.y;
			if(initial.y < 0) initial.y = 0;
			let diff = initial.y - clientY;

			if (diff > 0) {
				diff = (diff / (window.innerHeight - initial.height)) * initial.height * 0.2;
			} 
			if(diff > initial.height*0.2){
				diff = initial.height*0.2;
			}
			drawer.style.transform = `translateY(${-diff}px)`;
		}
	}

	function handleMouseUp(e: MouseEvent | TouchEvent) {
		if (!drawer) return;
		//if(e instanceof TouchEvent && e.touches.length == 0) return;
		e.preventDefault();
		
		const clientY = e instanceof TouchEvent ? e.changedTouches[0].clientY : e.clientY;
		if (initial.y - clientY < initial.height / 2) {
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
	on:touchmove={handleMouseMove}
	on:touchend={handleMouseUp}
	on:selectstart={handleSelect}
/>
<Drawer on:touchstart={handleMouseDown} on:drawer={handleMouseDown} on:backdrop={handleBackdrop}>
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