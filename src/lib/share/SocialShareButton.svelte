<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { ShareProvider } from '../providers/index.js';
	import type { ShareDrawerData } from './ShareDrawerState.svelte.js';

	interface Props {
		provider: ShareProvider;
		shareData: ShareDrawerData;
		style: {
			background?: string;
			shadow?: string;
			rounded?: string;
			overflow?: string;
			text?: string;
			onclick?: () => void;
		};
		[key: string]: any;
	}

	let { onclick, ...props }: Props = $props();

	let classes = $derived(
		`${props.style.background} ${props.style.shadow} ${props.style.rounded} ${props.style.overflow} ${props.class ?? ''}`
	);
</script>

<a
	href={props.provider.getShareUrl(props.shareData)}
	{onclick}
	target="_blank"
	class="btn flex min-w-[72px] snap-center flex-col items-center justify-center p-0"
>
	<div class={classes} class:p-2={!props.provider.image}>
		{#if props.provider.image}
			<img src={props.provider.image} alt={props.provider.name} class="h-[72px] w-[72px]" />
		{:else}
			<Icon icon={props.provider.icon} height={56} />
		{/if}
	</div>
	<p class={props.style.text}>{props.provider.name}</p>
</a>
