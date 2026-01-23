<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { locale } from '$lib/i18n';
	import type { Certification, SiteSettings } from '$lib/sanity/queries';
	import { getLocalizedValue, urlFor } from '$lib/sanity/queries';

	interface Props {
		certifications: Certification[];
		settings?: SiteSettings | null;
	}

	let { certifications, settings }: Props = $props();

	const currentLocale = $derived($locale || 'en');
</script>

<section id="certifications" class="certifications-section">
	<div class="section-container">
		<h2 class="section-title">{$_('certifications.title')}</h2>

		{#if settings?.certificationsDescription}
			<p class="section-description">
				{getLocalizedValue(settings.certificationsDescription, currentLocale)}
			</p>
		{/if}

		<div class="certifications-grid">
			{#if certifications.length > 0}
				{#each certifications as cert, index}
					<div class="certification-card" style="animation-delay: {index * 100}ms">
						{#if cert.image}
							<div class="certification-image">
								<img
									src={urlFor(cert.image).width(500).fit('max').url()}
									alt={cert.image.alt ||
										getLocalizedValue(cert.title, currentLocale) ||
										'Certification'}
									loading="lazy"
								/>
							</div>
						{/if}
						<div class="certification-content">
							<h3 class="certification-title">
								{getLocalizedValue(cert.title, currentLocale)}
							</h3>
							<p class="certification-issuer">
								{getLocalizedValue(cert.issuer, currentLocale)}
							</p>
						</div>
					</div>
				{/each}
			{:else}
				<div class="empty-state">
					<p>{$_('certifications.empty')}</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.certifications-section {
		padding: 5rem 1.5rem;
		background-color: var(--bg-primary);
	}

	.section-container {
		max-width: 1200px;
		margin: 0 auto;
	}

	.section-title {
		font-size: 2rem;
		font-weight: 700;
		color: var(--text-primary);
		text-align: center;
		margin-bottom: 3rem;
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

	.section-description {
		text-align: center;
		max-width: 700px;
		margin: 0 auto 2.5rem;
		font-size: 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
	}

	.certifications-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
	}

	@media (min-width: 640px) {
		.certifications-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.certifications-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	.certification-card {
		background-color: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		overflow: hidden;
		transition: all 0.3s ease;
		animation: fadeInUp 0.5s ease-out backwards;
	}

	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.certification-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg);
		border-color: var(--color-primary-500);
	}

	.certification-image {
		aspect-ratio: 1 / 1;
		background-color: var(--bg-tertiary);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
	}

	.certification-image img {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
		transition: transform 0.3s ease;
	}

	.certification-card:hover .certification-image img {
		transform: scale(1.05);
	}

	.certification-content {
		padding: 1.25rem;
		text-align: center;
	}

	.certification-title {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
		line-height: 1.4;
		margin-bottom: 0.375rem;
	}

	.certification-issuer {
		font-size: 0.875rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.empty-state {
		grid-column: 1 / -1;
		text-align: center;
		padding: 3rem;
		color: var(--text-tertiary);
		background-color: var(--bg-tertiary);
		border-radius: 12px;
	}
</style>
