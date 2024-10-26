<script lang="ts">
	import type { CssClasses } from '@skeletonlabs/skeleton';

	interface Props {
		style: {
			background?: CssClasses;
			color?: CssClasses;
			shadow?: CssClasses;
			rounded?: CssClasses;
			overflow?: CssClasses;
			margin?: CssClasses;
			width?: CssClasses;
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
