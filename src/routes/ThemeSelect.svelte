<script lang="ts">
	import { enhance } from '$app/forms';
	import { Popover } from '@skeletonlabs/skeleton-svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	const themes: { type: string; name: string; icon: string }[] = [
		{ type: 'catppuccin', name: 'Catppuccin', icon: '☕' },
		{ type: 'cerberus', name: 'Cerberus', icon: '🐶🔥' },
		{ type: 'concord', name: 'Concord', icon: '🍇' },
		{ type: 'crimson', name: 'Crimson', icon: '🩸' },
		{ type: 'fennec', name: 'Fennec', icon: '🦊' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '🔵' },
		{ type: 'legacy', name: 'Legacy', icon: '🏛️' },
		{ type: 'mint', name: 'Mint', icon: '🌿' },
		{ type: 'modern', name: 'Modern', icon: '✨' },
		{ type: 'mona', name: 'Mona', icon: '🎨' },
		{ type: 'nosh', name: 'Nosh', icon: '🍽️' },
		{ type: 'nouveau', name: 'Nouveau', icon: '🖌️' },
		{ type: 'pine', name: 'Pine', icon: '🌲' },
		{ type: 'reign', name: 'Reign', icon: '👑' },
		{ type: 'rocket', name: 'Rocket', icon: '🚀' },
		{ type: 'rose', name: 'Rose', icon: '🌹' },
		{ type: 'sahara', name: 'Sahara', icon: '🏜️' },
		{ type: 'seafoam', name: 'Seafoam', icon: '🌊' },
		{ type: 'terminus', name: 'Terminus', icon: '🔚' },
		{ type: 'vintage', name: 'Vintage', icon: '📻' },
		{ type: 'vox', name: 'Vox', icon: '🎤' },
		{ type: 'wintry', name: 'Wintry', icon: '❄️' }
	];

	let storeTheme = $state<string>('cerberus');
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
		<button class="variant-soft-surface hover:variant-soft-primary btn">
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
						{#each themes as { icon, name, type }}
							<li>
								<button
									class="option btn my-1 h-full w-full"
									type="submit"
									name="theme"
									value={type}
									class:preset-filled={storeTheme === type}
									class:preset-tonal={storeTheme !== type}
								>
									<span>{icon}</span>
									<span class="flex-auto text-left">{name}</span>
								</button>
							</li>
						{/each}
					</ul>
				</form>
			</nav>
		</div>
	{/snippet}
</Popover>
