<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { locale } from '$lib/i18n';
	import type { Project } from '$lib/sanity/queries';
	import { getLocalizedValue, urlFor } from '$lib/sanity/queries';

	interface Props {
		projects: Project[];
		showAll?: boolean;
	}

	let { projects, showAll = false }: Props = $props();

	const currentLocale = $derived($locale || 'en');

	// Show only featured or limit to 6 if not showAll
	const displayProjects = $derived(
		showAll ? projects : projects.filter((p) => p.featured).slice(0, 6)
	);
</script>

<section id="projects" class="projects-section">
	<div class="section-container">
		<h2 class="section-title">{$_('projects.title')}</h2>

		<div class="projects-list">
			{#if displayProjects.length > 0}
				{#each displayProjects as project, index}
					<div class="project-item" style="animation-delay: {index * 100}ms">
						<div class="project-content">
							<div class="project-layout">
								{#if project.image}
									<div class="project-image">
										<img
											src={urlFor(project.image).width(600).url()}
											alt={project.image.alt ||
												getLocalizedValue(project.title, currentLocale) ||
												'Project image'}
											loading="lazy"
										/>
									</div>
								{/if}
								<div class="project-details">
									<div class="project-header">
										<h3 class="project-title">
											{getLocalizedValue(project.title, currentLocale)}
										</h3>
										{#if project.liveUrl}
											<a
												href={project.liveUrl}
												target="_blank"
												rel="noopener noreferrer"
												class="visit-link"
												aria-label="Visit site"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="18"
													height="18"
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												>
													<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
													></path>
													<polyline points="15 3 21 3 21 9"></polyline>
													<line x1="10" y1="14" x2="21" y2="3"></line>
												</svg>
												Visit Site
											</a>
										{/if}
									</div>
									{#if project.description}
										<p class="project-description">
											{getLocalizedValue(project.description, currentLocale)}
										</p>
									{/if}
									{#if project.technologies && project.technologies.length > 0}
										<div class="project-technologies">
											{#each project.technologies as tech}
												<span class="tech-tag">{tech}</span>
											{/each}
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
				{/each}
			{:else}
				<div class="empty-state">
					<p>No projects yet. Add some from the CMS!</p>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.projects-section {
		padding: 5rem 1.5rem;
		background-color: var(--bg-secondary);
	}

	.section-container {
		max-width: 900px;
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

	.projects-list {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.project-item {
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

	.project-content {
		background-color: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		padding: 1.5rem;
		transition: all 0.2s ease;
	}

	.project-content:hover {
		border-color: var(--color-primary-500);
		box-shadow: var(--shadow-md);
	}

	.project-layout {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	@media (min-width: 768px) {
		.project-layout {
			flex-direction: row;
			gap: 1.5rem;
			align-items: stretch;
		}
	}

	.project-image {
		flex-shrink: 0;
		width: 100%;
		aspect-ratio: 16 / 10;
		background-color: var(--bg-tertiary);
		border-radius: 8px;
		overflow: hidden;
		border: 1px solid var(--border-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	@media (min-width: 768px) {
		.project-image {
			max-width: 280px;
			padding: 0;
		}
	}

	.project-image img {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		height: auto;
		object-fit: contain;
	}

	.project-details {
		flex: 1;
		min-width: 0;
		display: flex;
		flex-direction: column;
	}

	.project-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.75rem;
		flex-wrap: wrap;
	}

	.project-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
		flex: 1;
		min-width: 0;
	}

	.visit-link {
		display: inline-flex;
		align-items: center;
		gap: 0.375rem;
		padding: 0.5rem 0.875rem;
		background-color: transparent;
		border: 1px solid var(--border-primary);
		border-radius: 6px;
		color: var(--text-secondary);
		font-size: 0.85rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.2s ease;
		white-space: nowrap;
	}

	.visit-link:hover {
		border-color: var(--color-primary-500);
		color: var(--color-primary-500);
		background-color: rgba(99, 102, 241, 0.05);
	}

	.project-description {
		font-size: 0.95rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: 0.75rem;
	}

	.project-technologies {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: auto;
	}

	.tech-tag {
		padding: 0.25rem 0.625rem;
		background-color: var(--bg-tertiary);
		border-radius: 4px;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-secondary);
		font-family: var(--font-mono);
	}

	.empty-state {
		text-align: center;
		padding: 3rem;
		color: var(--text-tertiary);
		background-color: var(--bg-tertiary);
		border-radius: 12px;
	}
</style>
