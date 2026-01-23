<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { locale } from '$lib/i18n';
	import type { SiteSettings } from '$lib/sanity/queries';
	import PortableTextRenderer from '$lib/components/PortableTextRenderer.svelte';

	interface Props {
		settings: SiteSettings | null;
	}

	let { settings }: Props = $props();

	const currentLocale = $derived($locale || 'en');

	// Get the localized about text (Portable Text array)
	const aboutContent = $derived(
		settings?.aboutText?.[currentLocale] || settings?.aboutText?.en || null
	);
</script>

<section id="about" class="about">
	<div class="about-container">
		<h2 class="section-title">{$_('about.title')}</h2>

		<div class="about-content">
			{#if aboutContent}
				<div class="about-text">
					<PortableTextRenderer value={aboutContent} />
				</div>
			{:else}
				<p class="about-text placeholder">
					{$_('about.placeholder')}
				</p>
			{/if}
		</div>
	</div>
</section>

<style>
	.about {
		padding: 5rem 1.5rem;
		position: relative;
		background-color: var(--bg-secondary);
	}

	.about-container {
		max-width: 900px;
		margin: 0 auto;
	}

	.section-title {
		font-size: clamp(1.75rem, 4vw, 2.5rem);
		font-weight: 700;
		color: var(--text-primary);
		margin-bottom: 3rem;
		text-align: center;
		position: relative;
	}

	.section-title::after {
		content: '';
		position: absolute;
		bottom: -0.75rem;
		left: 50%;
		transform: translateX(-50%);
		width: 60px;
		height: 4px;
		background: var(--gradient-primary);
		border-radius: 2px;
	}

	.about-content {
		animation: fadeIn 0.6s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.about-text {
		font-size: 1.125rem;
		line-height: 1.8;
		color: var(--text-secondary);
		text-align: center;
	}

	/* Portable Text styles */
	.about-text :global(p) {
		margin-bottom: 1rem;
	}

	.about-text :global(p:last-child) {
		margin-bottom: 0;
	}

	.about-text :global(strong) {
		font-weight: 600;
		color: var(--text-primary);
	}

	.about-text :global(em) {
		font-style: italic;
	}

	.about-text :global(u) {
		text-decoration: underline;
	}

	.about-text :global(a) {
		color: var(--color-primary-500);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.about-text :global(a:hover) {
		text-decoration: underline;
	}

	.about-text.placeholder {
		color: var(--text-tertiary);
		font-style: italic;
	}

	@media (min-width: 768px) {
		.about {
			padding: 6rem 2rem;
		}

		.about-text {
			font-size: 1.25rem;
		}
	}
</style>
