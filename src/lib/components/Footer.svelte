<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { SiteSettings } from '$lib/sanity/queries';

	interface Props {
		settings?: SiteSettings | null;
	}

	let { settings }: Props = $props();

	// Get LinkedIn URL from social links
	const linkedinUrl = $derived(
		settings?.socialLinks?.find((link) => link.platform === 'linkedin')?.url || '#'
	);
</script>

<footer class="footer">
	<div class="footer-container">
		<div class="footer-content">
			<p class="built-with">
				{$_('footer.builtWith')}
				<a href="https://kit.svelte.dev" target="_blank" rel="noopener">SvelteKit</a>
				&
				<a href="https://www.sanity.io" target="_blank" rel="noopener">Sanity</a>
				{$_('footer.by')}
				<a href={linkedinUrl} target="_blank" rel="noopener noreferrer" class="author-link">
					{$_('footer.author')}
				</a>
			</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		border-top: 1px solid var(--border-primary);
		background-color: var(--bg-secondary);
		padding: 2rem 0;
	}

	.footer-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
	}

	.footer-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		text-align: center;
	}

	.built-with {
		color: var(--text-secondary);
		font-size: 0.875rem;
	}

	.author-link {
		color: var(--text-primary) !important;
		font-weight: 500;
	}

	.author-link:hover {
		color: var(--color-primary-500) !important;
	}

	.built-with a {
		color: var(--color-primary-500);
		text-decoration: none;
		transition: color 0.2s ease;
	}

	.built-with a:hover {
		color: var(--color-primary-400);
		text-decoration: underline;
	}
</style>
