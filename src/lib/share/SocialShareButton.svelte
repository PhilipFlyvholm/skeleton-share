<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { ShareProvider } from '../providers/index.js';
	import type { ShareDrawerData } from './ShareDrawerSettings.js';

    export let provider:ShareProvider;
    export let shareData:ShareDrawerData;
    export let style:{
        background?: string,
        shadow?: string,
        rounded?: string,
        overflow?: string,
        text?: string
    }
</script>

<a href={provider.getShareUrl(shareData)} on:click target="_blank" class="btn p-0 flex flex-col justify-center items-center snap-center min-w-[72px]">
	<div class="{style.background} {style.shadow} {style.rounded} {style.overflow}" class:p-2={!provider.image} >
        {#if provider.image}
            <img src={provider.image} alt={provider.name} class="h-[72px] w-[72px]" >
        {:else}
            <Icon icon={provider.icon} height={56} />
        {/if}
	</div>
    <p class={style.text}>{provider.name}</p>
</a>
