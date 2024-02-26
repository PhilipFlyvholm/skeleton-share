<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import Icon from '@iconify/svelte';
	import { Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
	import type { ShareDrawerData } from '$lib/share/ShareDrawerSettings.js';
	import SocialShareButton from '$lib/share/SocialShareButton.svelte';
	import { onDestroy, onMount } from 'svelte';
	import { destroyDrawer, initDrawer } from '$lib/ShareDrawerHandler.js';
	import type { ShareProvider } from '$lib/providers/index.js';
	import { createEventDispatcher } from 'svelte';
	import type { ShareEvents } from '$lib/share/ShareEvents.js';
	import UtilityShareButton from '$lib/share/UtilityShareButton.svelte';

	const dispatch = createEventDispatcher<ShareEvents>();
	export let drawer: Drawer;
	export let shareProviders: ShareProvider[];
	export let style: {
		socialShareButton?: ComponentProps<SocialShareButton>['style'];
		utilityButton?: ComponentProps<UtilityShareButton>['style'];
		spacerBackground?: string;
		handleBackground?: string;
	} = {};
	$: computedStyle = {
		socialShareButton: {
			background: 'bg-white',
			shadow: 'shadow-md',
			rounded: 'rounded-xl',
			overflow: 'overflow-hidden',
			text: 'mt-1 !mx-0',
			...style.socialShareButton
		},
		utilityButton: {
			background: 'bg-white',
			shadow: 'shadow',
			rounded: '',
			overflow: '',
			margin: 'my-2',
			width: 'min-w-[50%]'
		},
		spacerBackground: 'bg-gray-200',
		handleBackground: 'bg-gray-300',
		...style
	};

	const drawerStore = getDrawerStore();

	const shareData = $drawerStore.meta as ShareDrawerData;
	function handleClipboardCopy() {
		if (navigator.clipboard && shareData.clipboardMessage) {
			navigator.clipboard.writeText(shareData.clipboardMessage);
			dispatch('clipboard-success');
		} else {
			dispatch('clipboard-failed');
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
		dispatch('download-success');
	}

	onMount(() => {
		initDrawer(drawer, drawerStore, dispatch);
	});

	onDestroy(() => {
		destroyDrawer(drawer);
	});
</script>

<div class="share-drawer-content flex flex-col items-center py-4">
	<div class="handle my-2 h-2 w-10 rounded-full {computedStyle.handleBackground}" />
	<div class="drawer-content flex w-full flex-col items-center">
		<div class="mx-auto my-2 flex max-w-full snap-x gap-5 overflow-x-auto px-4 py-3 md:px-8">
			{#each shareProviders as provider}
				<SocialShareButton
					style={computedStyle.socialShareButton}
					{provider}
					{shareData}
					on:click={() => dispatch('social-share', { provider: provider.name })}
				/>
			{/each}
		</div>
		<div class="spacer my-2 h-[1px] w-full {computedStyle.spacerBackground}" />
		{#if shareData.files && shareData.files.length > 0}
			<UtilityShareButton style={computedStyle.utilityButton} on:click={() => handleDownload()}
				>Download image <Icon icon="tabler:file-download" /></UtilityShareButton
			>
		{/if}
		<UtilityShareButton style={computedStyle.utilityButton} on:click={() => handleClipboardCopy()}
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
