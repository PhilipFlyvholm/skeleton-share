<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import DrawerHandler from './DrawerHandler.svelte';
	import Footer from './footer.svelte';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
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
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer"><Footer /></svelte:fragment>
</AppShell>
