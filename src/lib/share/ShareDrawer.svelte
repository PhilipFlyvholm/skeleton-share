<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Modal } from '@skeletonlabs/skeleton-svelte';
	import SocialShareButton from '$lib/share/SocialShareButton.svelte';
	import { onMount } from 'svelte';
	import { initDrawer } from '$lib/ShareDrawerHandler.svelte.js';
	import type { ShareProvider } from '$lib/providers/index.js';
	import UtilityShareButton from '$lib/share/UtilityShareButton.svelte';
	import { closeShareDrawer, shareDrawerState } from './ShareDrawerState.svelte.js';

	interface Props {
		shareProviders: ShareProvider[];
		onClipboardSuccess?: () => void;
		onClipboardFailed?: () => void;
		onDownloadSuccess?: () => void;
		onSocialShare?: (provider: string) => boolean;
		onClose?: () => void;
		style?: {
			socialShareButton?: ComponentProps<typeof SocialShareButton>['style'];
			utilityButton?: ComponentProps<typeof UtilityShareButton>['style'];
			spacerBackground?: String;
			handleBackground?: String;
		};
	}

	let {
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

	

	function handleClipboardCopy() {
		if (!shareDrawerState.meta) {
			onClipboardFailed?.();
			return;
		}
		if (navigator.clipboard && shareDrawerState.meta.clipboardMessage) {
			navigator.clipboard.writeText(shareDrawerState.meta.clipboardMessage);
			onClipboardSuccess?.();
		} else {
			onClipboardFailed?.();
		}
		closeShareDrawer();
	}

	function handleDownload(): any {
		if (!shareDrawerState.meta) {
			return;
		}
		const link = document.createElement('a');
		link.href = shareDrawerState.meta.files ? URL.createObjectURL(shareDrawerState.meta.files[0]) : '';
		link.download = 'minesweeper.png';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		onDownloadSuccess?.();
	}

	onMount(() => {
		initDrawer(shareDrawerState, onClose);
	});
</script>

<Modal
	bind:open={shareDrawerState.open}
	triggerBase="btn preset-tonal"
	contentBase="bg-surface-100-900 p-4 space-y-4 shadow-xl w-[480px] h-screen"
	positionerJustify="justify-start"
	positionerAlign=""
	positionerPadding=""
	transitionsPositionerIn={{ x: -480, duration: 200 }}
	transitionsPositionerOut={{ x: -480, duration: 200 }}
>
	{#snippet content()}
		{@const shareData = shareDrawerState.meta}
		{#if shareData}
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
										closeShareDrawer();
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
					<UtilityShareButton
						style={computedStyle.utilityButton}
						onclick={() => handleClipboardCopy()}
						>Copy to clipboard <Icon icon="tabler:clipboard-copy" /></UtilityShareButton
					>
				</div>
			</div>
		{/if}
	{/snippet}
</Modal>

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
