<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { theme } from '$lib/stores/theme';
	import { initI18n } from '$lib/i18n';
	import { waitLocale } from 'svelte-i18n';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';

	interface Props {
		data: import('./$types').LayoutData;
		children: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
	let ready = $state(false);

	// Initialize i18n
	initI18n();

	onMount(async () => {
		// Initialize theme
		theme.init();
		// Wait for locale to be loaded
		await waitLocale();
		ready = true;
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link
		href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Outfit:wght@300;400;500;600;700&subset=cyrillic&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

{#if ready}
	<Navbar settings={data.settings} />
	<main class="main-content">
{@render children()}
	</main>
	<Footer settings={data.settings} />
{:else}
	<div class="loading-screen">
		<div class="loading-spinner"></div>
	</div>
{/if}

<style>
	.main-content {
		padding-top: 73px; /* Account for fixed navbar */
		min-height: 100vh;
	}

	.loading-screen {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
		background-color: var(--bg-primary);
	}

	.loading-spinner {
		width: 40px;
		height: 40px;
		border: 3px solid var(--border-primary);
		border-top-color: var(--color-primary-500);
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>
