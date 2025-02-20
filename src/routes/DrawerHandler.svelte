<script lang="ts">
	import ShareDrawer from '$lib/share/ShareDrawer.svelte';
	//import ShareDrawer2 from '$lib/share/ShareDrawer2.svelte';
	import {
		EmailProvider,
		FacebookProvider,
		LinkedInProvider,
		MessengerProvider,
		WhatsAppProvider,
		XProvider,
		type ShareProvider
	} from '../lib/providers/index.js';

	const shareProviders: ShareProvider[] = [
		EmailProvider,
		FacebookProvider,
		MessengerProvider(''),
		XProvider,
		WhatsAppProvider,
		LinkedInProvider
	];
</script>

<!-- 
<ShareDrawer2 /> -->

<ShareDrawer
	{shareProviders}
	onClipboardSuccess={() => console.log('Clipboard success')}
	onClipboardFailed={() => console.log('Clipboard failed')}
	onClose={() => 'Closing drawer'}
	onDownloadSuccess={() => console.log('Download success')}
	onSocialShare={(provider) => {
		console.log('Social share success to ' + provider);
		return true;
	}}
/>
