<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { locale } from '$lib/i18n';
	import type { Experience } from '$lib/sanity/queries';
	import { getLocalizedValue } from '$lib/sanity/queries';

	interface Props {
		experiences: Experience[];
		resumeUrl?: string;
	}

	let { experiences, resumeUrl }: Props = $props();

	type TabType = 'fulltime' | 'internship' | 'education';
	let activeTab = $state<TabType>('fulltime');

	const currentLocale = $derived($locale || 'en');

	const tabs: { key: TabType; label: string }[] = [
		{ key: 'fulltime', label: 'experience.tabs.fulltime' },
		{ key: 'internship', label: 'experience.tabs.internship' },
		{ key: 'education', label: 'experience.tabs.education' }
	];

	const filteredExperiences = $derived(
		experiences.filter((exp) => exp.type === activeTab).sort((a, b) => a.order - b.order)
	);

	// Calculate max items across all tabs for consistent height
	const maxItemsCount = $derived(
		Math.max(
			experiences.filter((exp) => exp.type === 'fulltime').length,
			experiences.filter((exp) => exp.type === 'internship').length,
			experiences.filter((exp) => exp.type === 'education').length,
			1 // Minimum of 1 to avoid 0
		)
	);

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString(currentLocale === 'mk' ? 'mk-MK' : 'en-US', {
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<section id="experience" class="experience-section">
	<div class="section-container">
		<h2 class="section-title">{$_('experience.title')}</h2>

		<div class="tabs">
			{#each tabs as tab}
				<button
					class="tab-button"
					class:active={activeTab === tab.key}
					onclick={() => (activeTab = tab.key)}
				>
					{$_(tab.label)}
				</button>
			{/each}
		</div>

		<div
			class="timeline"
			style="min-height: {maxItemsCount * 180}px; --line-height: {filteredExperiences.length * 180 - 40}px"
		>
			{#if filteredExperiences.length > 0}
				{#each filteredExperiences as exp, index (exp._id)}
					<div class="timeline-item" style="animation-delay: {index * 100}ms">
						<div class="timeline-marker"></div>
						<div class="timeline-content">
							{#if exp.type === 'education'}
								<!-- Education: Just show university name -->
								<h3 class="timeline-title">
									{getLocalizedValue(exp.university, currentLocale)}
								</h3>
							{:else}
								<!-- Full Time / Internship -->
								<div class="timeline-header">
									<h3 class="timeline-title">
										{getLocalizedValue(exp.title, currentLocale)}
									</h3>
									{#if exp.startDate}
										<span class="timeline-date">
											{formatDate(exp.startDate)} - {exp.current
												? $_('experience.current')
												: exp.endDate
													? formatDate(exp.endDate)
													: ''}
										</span>
									{/if}
								</div>
								{#if exp.organization}
									<p class="timeline-organization">
										{getLocalizedValue(exp.organization, currentLocale)}
									</p>
								{/if}
								{#if exp.technologies && exp.technologies.length > 0}
									<div class="timeline-technologies">
										{#each exp.technologies as tech}
											<span class="tech-tag">{tech}</span>
										{/each}
									</div>
								{/if}
							{/if}
						</div>
					</div>
				{/each}
			{:else}
				<div class="empty-state">
					<p>No {activeTab} entries yet. Add some from the CMS!</p>
				</div>
			{/if}
		</div>

		{#if resumeUrl}
			<div class="resume-link">
				<a href={resumeUrl} target="_blank" rel="noopener noreferrer" class="view-resume">
					{$_('experience.viewAll')}
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
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
						<polyline points="15 3 21 3 21 9"></polyline>
						<line x1="10" y1="14" x2="21" y2="3"></line>
					</svg>
				</a>
			</div>
		{/if}
	</div>
</section>

<style>
	.experience-section {
		padding: 5rem 1.5rem;
		background-color: var(--bg-primary);
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
		margin-bottom: 2.5rem;
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

	.tabs {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 3rem;
		flex-wrap: wrap;
	}

	.tab-button {
		padding: 0.75rem 1.5rem;
		background-color: transparent;
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		color: var(--text-secondary);
		font-size: 0.95rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.tab-button:hover {
		border-color: var(--color-primary-500);
		color: var(--color-primary-500);
	}

	.tab-button.active {
		background: var(--gradient-primary);
		border-color: transparent;
		color: white;
	}

	.timeline {
		position: relative;
		padding-left: 2rem;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		height: var(--line-height, 100%);
		width: 2px;
		background: var(--border-primary);
		transition: height 0.3s ease;
	}

	.timeline-item {
		position: relative;
		padding-bottom: 2.5rem;
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

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	.timeline-marker {
		position: absolute;
		left: -2rem;
		top: 0.25rem;
		width: 12px;
		height: 12px;
		background: var(--gradient-primary);
		border-radius: 50%;
		transform: translateX(-50%);
		box-shadow: 0 0 0 4px var(--bg-primary);
	}

	.timeline-content {
		background-color: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 12px;
		padding: 1.5rem;
		margin-left: 1rem;
		transition: all 0.2s ease;
	}

	.timeline-content:hover {
		border-color: var(--color-primary-500);
		box-shadow: var(--shadow-md);
	}

	.timeline-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		flex-wrap: wrap;
		margin-bottom: 0.5rem;
	}

	.timeline-title {
		font-size: 1.125rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.timeline-date {
		font-size: 0.85rem;
		color: var(--color-primary-500);
		font-weight: 500;
		white-space: nowrap;
	}

	.timeline-organization {
		font-size: 0.95rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.timeline-technologies {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin-top: 0.75rem;
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

	.resume-link {
		display: flex;
		justify-content: center;
		margin-top: 2.5rem;
	}

	.view-resume {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background-color: transparent;
		border: 2px solid var(--border-primary);
		border-radius: 8px;
		color: var(--text-primary);
		font-size: 0.95rem;
		font-weight: 500;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.view-resume:hover {
		border-color: var(--color-primary-500);
		color: var(--color-primary-500);
	}
</style>
