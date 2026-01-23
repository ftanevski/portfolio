<script lang="ts">
	import { theme } from '$lib/stores/theme';

	function handleToggle() {
		theme.toggle();
	}
</script>

<button
	onclick={handleToggle}
	class="theme-toggle"
	aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	title={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
>
	{#if $theme === 'dark'}
		<!-- Sun icon for dark mode (click to switch to light) -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="4"></circle>
			<path d="M12 2v2"></path>
			<path d="M12 20v2"></path>
			<path d="m4.93 4.93 1.41 1.41"></path>
			<path d="m17.66 17.66 1.41 1.41"></path>
			<path d="M2 12h2"></path>
			<path d="M20 12h2"></path>
			<path d="m6.34 17.66-1.41 1.41"></path>
			<path d="m19.07 4.93-1.41 1.41"></path>
		</svg>
	{:else}
		<!-- Moon icon for light mode (click to switch to dark) -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		background-color: transparent;
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.theme-toggle:hover {
		background-color: var(--bg-tertiary);
		border-color: var(--border-secondary);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--color-primary-500);
		outline-offset: 2px;
	}

	.theme-toggle svg {
		transition: transform 0.3s ease;
	}

	.theme-toggle:hover svg {
		transform: rotate(15deg);
	}
</style>
