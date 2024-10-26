<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Drawer, getDrawerStore, type CssClasses } from '@skeletonlabs/skeleton';
	import type { ShareDrawerData } from '$lib/share/ShareDrawerSettings.js';
	import SocialShareButton from '$lib/share/SocialShareButton.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { destroyDrawer, initDrawer } from '$lib/ShareDrawerHandler.svelte.js';
	import type { ShareProvider } from '$lib/providers/index.js';
	import UtilityShareButton from '$lib/share/UtilityShareButton.svelte';

	interface Props {
		drawer: Drawer;
		shareProviders: ShareProvider[];
		onClipboardSuccess?: () => void;
		onClipboardFailed?: () => void;
		onDownloadSuccess?: () => void;
		onSocialShare?: (provider: string) => boolean;
		onClose?: () => void;
		style?: {
			socialShareButton?: ComponentProps<typeof SocialShareButton>['style'];
			utilityButton?: ComponentProps<typeof UtilityShareButton>['style'];
			spacerBackground?: CssClasses;
			handleBackground?: CssClasses;
		};
	}

	let {
		drawer,
		shareProviders,
		onClipboardSuccess,
		onClipboardFailed,
		onDownloadSuccess,
		onSocialShare,
		onClose,
		style = {}
	}: Props = $props();
	//IOS:
	//socialShareButton: 'bg-white'
	//utilityButton: 'bg-white'
	//spacerBackground: 'bg-gray-200'
	//handleBackground: 'bg-gray-300'
	let computedStyle = $derived({
		...style,
		socialShareButton: {
			...style.socialShareButton,
			background: style.socialShareButton?.background || 'bg-surface-50-900-token',
			shadow: style.socialShareButton?.shadow || 'shadow-md',
			rounded: style.socialShareButton?.rounded || 'rounded-xl',
			overflow: style.socialShareButton?.overflow || 'overflow-hidden',
			text: style.socialShareButton?.text || 'mt-1 !mx-0'
		},
		utilityButton: {
			...style.utilityButton,
			background: style.utilityButton?.background || 'bg-surface-50-900-token',
			shadow: style.utilityButton?.shadow || 'shadow',
			rounded: style.utilityButton?.rounded || '',
			overflow: style.utilityButton?.overflow || '',
			margin: style.utilityButton?.margin || 'my-2',
			width: style.utilityButton?.width || 'min-w-[50%]'
		},
		spacerBackground: style.spacerBackground || 'bg-surface-300',
		handleBackground: style.handleBackground || 'bg-surface-300'
	});

	const drawerStore = getDrawerStore();

	const shareData = $drawerStore.meta as ShareDrawerData;
	function handleClipboardCopy() {
		if (navigator.clipboard && shareData.clipboardMessage) {
			navigator.clipboard.writeText(shareData.clipboardMessage);
			onClipboardSuccess?.();
		} else {
			onClipboardFailed?.();
		}
		drawerStore.close();
	}

	function handleDownload(): any {
		const link = document.createElement('a');
		link.href = shareData.files ? URL.createObjectURL(shareData.files[0]) : '';
		link.download = 'minesweeper.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		onDownloadSuccess?.();
	}

	onMount(() => {
		initDrawer(drawer, drawerStore, onClose);
	});

	onDestroy(() => {
		destroyDrawer(drawer);
	});
</script>

<div class="share-drawer-content flex flex-col items-center py-4">
	<div class="handle my-2 h-2 w-10 rounded-full {computedStyle.handleBackground}"></div>
	<div class="drawer-content flex w-full flex-col items-center">
		<div class="mx-auto my-2 flex max-w-full snap-x gap-5 overflow-x-auto px-4 py-3 md:px-8">
			{#each shareProviders as provider}
				<SocialShareButton
					style={computedStyle.socialShareButton}
					{provider}
					{shareData}
					onclick={() => {
						const continued = onSocialShare ? onSocialShare(provider.name) : true;
						if (continued) {
							drawerStore.close();
						}
					}}
				/>
			{/each}
		</div>
		<div class="spacer my-2 h-[1px] w-full {computedStyle.spacerBackground}"></div>
		{#if shareData.files && shareData.files.length > 0}
			<UtilityShareButton style={computedStyle.utilityButton} onclick={() => handleDownload()}
				>Download image <Icon icon="tabler:file-download" /></UtilityShareButton
			>
		{/if}
		<UtilityShareButton style={computedStyle.utilityButton} onclick={() => handleClipboardCopy()}
			>Copy to clipboard <Icon icon="tabler:clipboard-copy" /></UtilityShareButton
		>
	</div>
</div>

<style>
	:global(.drawer) {
		overflow: unset;
	}
	:global(.drawer::after) {
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
