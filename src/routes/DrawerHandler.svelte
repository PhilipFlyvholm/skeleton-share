<script lang="ts">
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import ShareDrawer from '$lib/share/ShareDrawer.svelte';
	import { isShareDrawer } from '$lib/share/ShareDrawerSettings.js';
	import { EmailProvider, FacebookProvider, LinkedInProvider, MessengerProvider, WhatsAppProvider, XProvider, type ShareProvider } from '../lib/providers/index.js';

	const drawerStore = getDrawerStore();
	let drawer:Drawer;
	
	const shareProviders: ShareProvider[] = [EmailProvider, FacebookProvider, MessengerProvider(""), XProvider, WhatsAppProvider, LinkedInProvider];
</script>

<Drawer bind:this={drawer}>
	{#if isShareDrawer(drawerStore)}
		<ShareDrawer {drawer} {shareProviders}
		/>
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
