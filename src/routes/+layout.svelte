<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import DrawerHandler from './DrawerHandler.svelte';
	import Footer from './footer.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	initializeStores();
</script>

<DrawerHandler />
<AppShell>
	<!--<svelte:fragment slot="header">Header</svelte:fragment>-->
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	{@render children?.()}
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	{#snippet footer()}
		<Footer />
	{/snippet}
</AppShell>
