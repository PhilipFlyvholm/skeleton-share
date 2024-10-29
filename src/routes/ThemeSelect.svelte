<script lang="ts">
	import { enhance } from '$app/forms';
	import { Popover } from '@skeletonlabs/skeleton-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
    const themes = [
		{ type: 'skeleton', name: 'Skeleton', icon: '💀' },
		{ type: 'wintry', name: 'Wintry', icon: '🌨️' },
		{ type: 'modern', name: 'Modern', icon: '🤖' },
		{ type: 'rocket', name: 'Rocket', icon: '🚀' },
		{ type: 'seafoam', name: 'Seafoam', icon: '🧜‍♀️' },
		{ type: 'vintage', name: 'Vintage', icon: '📺' },
		{ type: 'sahara', name: 'Sahara', icon: '🏜️' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
		{ type: 'gold-nouveau', name: 'Gold Nouveau', icon: '💫' },
		{ type: 'crimson', name: 'Crimson', icon: '⭕' }
	];
	let storeTheme = $state<string>('skeleton');
	const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();

		if (theme) {
			document.body.setAttribute('data-theme', theme);
			storeTheme = theme;
		}
	};
</script>

<Popover>
	{#snippet trigger()}
		<button class="variant-soft-surface btn hover:variant-soft-primary">
			<i class="fa-solid fa-palette text-lg md:!hidden"></i>
			<span class="hidden md:inline-block">Theme</span>
			<i class="fa-solid fa-caret-down opacity-50"></i>
		</button>
	{/snippet}
	{#snippet content()}
		<div class="card w-60 p-4 shadow-xl" data-popup="theme">
			<nav class="list-nav -m-4 max-h-64 overflow-y-auto p-4 lg:max-h-[500px]">
				<form action="/?/setTheme" method="POST" use:enhance={setTheme}>
					<ul>
						<!-- , badge -->
						{#each themes as { icon, name, type }}
							<li>
								<button
									class="option h-full w-full"
									type="submit"
									name="theme"
									value={type}
									class:bg-primary-active-token={storeTheme === type}
								>
									<span>{icon}</span>
									<span class="flex-auto text-left">{name}</span>
									<!-- {#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if} -->
								</button>
							</li>
						{/each}
					</ul>
				</form>
			</nav>
		</div>
	{/snippet}
</Popover>
