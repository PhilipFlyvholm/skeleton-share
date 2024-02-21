<script>
	import { AppShell } from '@skeletonlabs/skeleton';
	import '../app.pcss';
	import { initializeStores } from '@skeletonlabs/skeleton';
	import DrawerHandler from '$lib/DrawerHandler.svelte';
	initializeStores();
</script>
<DrawerHandler />
<AppShell>
	<svelte:fragment slot="header">Header</svelte:fragment>
	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
