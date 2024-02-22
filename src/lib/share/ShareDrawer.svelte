<script lang="ts">
	import Icon from '@iconify/svelte';
	import { getDrawerStore, getToastStore } from '@skeletonlabs/skeleton';
	import type { ShareDrawerData } from './ShareDrawerSettings.js';
	import SocialShareButton from './SocialShareButton.svelte';
	import { shareProviders } from '$lib/share/providers/index.js';
	const drawerStore = getDrawerStore();
	//const toastStore = getToastStore();

	const shareData = $drawerStore.meta as ShareDrawerData;
	function handleClipboardCopy() {
		console.log('Copying to clipboard');
		if (navigator.clipboard && shareData.clipboardMessage) {
			navigator.clipboard.writeText(shareData.clipboardMessage);
			//createToast(toastStore, 'Copied to clipboard!');
		} else {
			//createToast(toastStore, 'Failed to copy to clipboard', true);
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
	}
</script>

<div class="share-drawer-content flex flex-col items-center py-4">
	<div class="handle my-2 h-2 w-10 rounded-full bg-[#D4D4D8]" />
	<div class="drawer-content flex flex-col items-center w-full">
		<div class="mx-auto my-2 flex max-w-full gap-5 overflow-x-auto px-4 md:px-8 py-3 snap-x">
			{#each shareProviders as provider}
				<SocialShareButton
					name={provider.name}
					icon={provider.icon}
					link={provider.getShareUrl(shareData)}
				/>
			{/each}
		</div>
		<div class="spacer my-2 h-[1px] w-full bg-[#D4D4D8]" />
		{#if shareData.files && shareData.files.length > 0}
			<button
				class="btn my-2 flex min-w-[50%] justify-between bg-white shadow"
				type="button"
				on:click={() => handleDownload()}
				>Download image <Icon icon="tabler:file-download" /></button
			>
		{/if}

		<button
			class="btn my-2 flex min-w-[50%] justify-between bg-white shadow"
			on:click={() => handleClipboardCopy()}
			>Copy to clipboard <Icon icon="tabler:clipboard-copy" /></button
		>
	</div>
</div>