<script lang="ts">
	import { _ } from 'svelte-i18n';
	import type { SiteSettings } from '$lib/sanity/queries';

	interface Props {
		settings: SiteSettings | null;
	}

	let { settings }: Props = $props();

	// Social icon SVGs
	const socialIcons: Record<string, string> = {
		github: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`,
		linkedin: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
		twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
		youtube: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>`,
		twitch: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/></svg>`,
		codepen: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M24 8.182l-.018-.087-.017-.05c-.01-.024-.018-.05-.03-.075-.003-.018-.015-.034-.02-.05l-.035-.067-.03-.05-.044-.06-.046-.045-.06-.06-.017-.015L12.41.087a.692.692 0 00-.82 0L.44 7.697l-.015.013-.066.06-.044.046-.06.06-.03.05-.035.065-.02.05c-.01.024-.02.05-.03.075l-.017.05-.018.086v7.636l.018.086.017.05.03.076.02.05.035.065.03.05.044.06.046.044.06.06.017.015 11.15 7.61a.69.69 0 00.82 0l11.15-7.61.015-.013.066-.06.044-.045.06-.06.03-.05.035-.067.02-.05.03-.075.017-.05.018-.087V8.182zm-1.36 6.632l-4.454-2.98 4.454-2.98v5.96zM12 18.32l-4.92-3.3 4.92-3.3 4.92 3.3-4.92 3.3zm.69-8.406l4.915-3.298 4.038 2.756-4.42 2.96-4.533-2.418zM6.395 6.616l4.915 3.298-4.533 2.418-4.42-2.96 4.038-2.756zM1.36 8.813l4.454 2.98-4.454 2.98V8.812z"/></svg>`,
		instagram: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
		discord: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/></svg>`
	};
</script>

<section id="contact" class="contact-section">
	<div class="section-container">
		<h2 class="section-title">{$_('contact.title')}</h2>

		<div class="contact-info">

			{#if settings?.email}
				<div class="contact-email">
					<span class="email-label">{$_('contact.emailMe')}:</span>
					<a href="mailto:{settings.email}" class="email-link">
						{settings.email}
					</a>
				</div>
			{/if}

			{#if settings?.socialLinks && settings.socialLinks.length > 0}
				<div class="contact-socials">
					{#each settings.socialLinks as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="social-link"
							aria-label={social.platform}
						>
							{@html socialIcons[social.platform] || ''}
							<span class="social-name">{social.platform}</span>
						</a>
					{/each}
				</div>
			{:else}
				<div class="contact-socials">
					<a href="#" class="social-link" aria-label="GitHub">
						{@html socialIcons.github}
						<span class="social-name">GitHub</span>
					</a>
					<a href="#" class="social-link" aria-label="LinkedIn">
						{@html socialIcons.linkedin}
						<span class="social-name">LinkedIn</span>
					</a>
					<a href="#" class="social-link" aria-label="Twitter">
						{@html socialIcons.twitter}
						<span class="social-name">Twitter</span>
					</a>
				</div>
			{/if}
		</div>
	</div>
</section>

<style>
	.contact-section {
		padding: 5rem 1.5rem;
		background-color: var(--bg-secondary);
	}

	.section-container {
		max-width: 600px;
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

	.contact-info {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		justify-content: space-between;
		align-items: center;
		text-align: center;
	}

	.contact-email {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		align-items: center;
	}

	.email-label {
		font-size: 0.875rem;
		color: var(--text-tertiary);
	}

	.email-link {
		font-size: 1.125rem;
		font-weight: 500;
		color: var(--color-primary-500);
		text-decoration: none;
	}

	.email-link:hover {
		text-decoration: underline;
	}

	.contact-socials {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
		margin-top: auto;
		justify-content: center;
	}

	.social-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1rem;
		background-color: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.875rem;
		font-weight: 500;
		transition: all 0.2s ease;
	}

	.social-link:hover {
		background-color: var(--color-primary-500);
		border-color: var(--color-primary-500);
		color: white;
		transform: translateY(-2px);
	}

	.social-name {
		text-transform: capitalize;
	}
</style>
