<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';

	// Bind to the checked state
	let mode = $state(false);

	// Handle the change in state when toggled.
	function handleModeChange(mode:boolean) {
		// NOTE: implementation may differ per Tailwind config and framework:
		// https://tailwindcss.com/docs/dark-mode#toggling-dark-mode-manually
		console.log({ mode });
	}

    $effect(() => {
        handleModeChange(mode);
    });
</script>

<Switch name="mode" controlActive="bg-surface-200" bind:checked={mode}>
	{#snippet inactiveChild()}<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide-icon lucide lucide-moon"
			><!----><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><!----><!----><!----></svg
		>{/snippet}
	{#snippet activeChild()}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			class="lucide-icon lucide lucide-sun"
			><!----><circle cx="12" cy="12" r="4"></circle><!----><path d="M12 2v2"></path><!----><path
				d="M12 20v2"
			></path><!----><path d="m4.93 4.93 1.41 1.41"></path><!----><path d="m17.66 17.66 1.41 1.41"
			></path><!----><path d="M2 12h2"></path><!----><path d="M20 12h2"></path><!----><path
				d="m6.34 17.66-1.41 1.41"
			></path><!----><path d="m19.07 4.93-1.41 1.41"></path><!----><!----><!----></svg
		>{/snippet}
</Switch>
