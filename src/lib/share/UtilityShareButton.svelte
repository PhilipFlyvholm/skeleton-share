<script lang="ts">
	export let style:{
        background?: string,
        color?: string,
        shadow?: string,
        rounded?: string,
        overflow?: string,
        margin?: string,
        width?: string
    };
</script>

<button class="btn flex justify-between {style.background} {style.shadow} {style.rounded} {style.margin} {style.overflow} {style.margin} {style.width} {style.color}" on:click><slot /></button>
