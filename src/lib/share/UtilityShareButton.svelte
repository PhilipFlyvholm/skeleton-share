<script lang="ts">
	import type { CssClasses } from "@skeletonlabs/skeleton";

	export let style:{
        background?: CssClasses,
        color?: CssClasses,
        shadow?: CssClasses,
        rounded?: CssClasses,
        overflow?: CssClasses,
        margin?: CssClasses,
        width?: CssClasses
    };
</script>

<button class="btn flex justify-between {style.background} {style.shadow} {style.rounded} {style.margin} {style.overflow} {style.margin} {style.width} {style.color}" on:click><slot /></button>
