<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { ShareProvider } from '../providers/index.js';
	import type { ShareDrawerData } from './ShareDrawerSettings.js';
	import type { CssClasses } from '@skeletonlabs/skeleton';

    export let provider:ShareProvider;
    export let shareData:ShareDrawerData;
    export let style:{
        background?: CssClasses,
        shadow?: CssClasses,
        rounded?: CssClasses,
        overflow?: CssClasses,
        text?: CssClasses
    }

    $: classes = `${style.background} ${style.shadow} ${style.rounded} ${style.overflow} ${$$props.class ?? ''}`
</script>
<a href={provider.getShareUrl(shareData)} on:click target="_blank" class="btn p-0 flex flex-col justify-center items-center snap-center min-w-[72px]">
	<div class="{classes}" class:p-2={!provider.image} >
        {#if provider.image}
            <img src={provider.image} alt={provider.name} class="h-[72px] w-[72px]" >
        {:else}
            <Icon icon={provider.icon} height={56} />
        {/if}
	</div>
    <p class={style.text}>{provider.name}</p>
</a>
