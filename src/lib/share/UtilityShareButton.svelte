<script lang="ts">

	interface Props {
		style: {
			background?: string;
			color?: string;
			shadow?: string;
			rounded?: string;
			overflow?: string;
			margin?: string;
			width?: string;
		};
		onclick?: () => void;
		children?: import('svelte').Snippet;
	}

	let { style, children, onclick }: Props = $props();
</script>

<button
	class="btn flex justify-between {style.background} {style.shadow} {style.rounded} {style.margin} {style.overflow} {style.margin} {style.width} {style.color}"
	{onclick}
>
	{@render children?.()}
</button>
