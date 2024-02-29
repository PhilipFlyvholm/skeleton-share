<script lang="ts">
	import { enhance } from '$app/forms';
	import { shareDrawerSettings } from '$lib/share/ShareDrawerSettings.js';
	import { LightSwitch, getDrawerStore, popup } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { writable } from 'svelte/store';

	const drawerStore = getDrawerStore();
	const shareDrawer = shareDrawerSettings({
		title: 'Check out this cool libary',
		text: 'I just found this cool library called skeleton-share, that gives a native-like shareing on the web. Check it out!',
		url: 'https://github.com/PhilipFlyvholm/skeleton-share'
	});

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
	const storeTheme = writable('skeleton');
	const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();

		if (theme) {
			document.body.setAttribute('data-theme', theme);
			storeTheme.set(theme);
		}
	};
</script>

<div class="container m-auto flex h-full flex-col items-center justify-center">
	<h1 class="gradient-heading h1 font-mono font-bold">Skeleton share</h1>
	<p>Native-like web sharing created with Skeleton and Svelte</p>
	<button
		type="button"
		class="variant-filled-primary btn my-2"
		on:click={() => drawerStore.open(shareDrawer)}>Open Share Drawer</button
	>
	<div class="fixed right-2 top-2 flex justify-center items-center gap-2">
		<button class="btn variant-soft-surface hover:variant-soft-primary" use:popup={{ event: 'click', target: 'theme', closeQuery: 'a[href]' }}>
			<i class="fa-solid fa-palette text-lg md:!hidden" />
			<span class="hidden md:inline-block">Theme</span>
			<i class="fa-solid fa-caret-down opacity-50" />
		</button>
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
									class:bg-primary-active-token={$storeTheme === type}
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
		<LightSwitch />
	</div>
</div>
