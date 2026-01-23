<script lang="ts">
	import { _ } from 'svelte-i18n';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import LanguageSwitcher from './LanguageSwitcher.svelte';
	import type { SiteSettings } from '$lib/sanity/queries';

	interface Props {
		settings: SiteSettings | null;
	}

	let { settings }: Props = $props();

	let isMenuOpen = $state(false);
	let windowWidth = $state(1024);
	let activeSection = $state('home');

	// Get LinkedIn URL from social links
	const linkedinUrl = $derived(
		settings?.socialLinks?.find((link) => link.platform === 'linkedin')?.url || '/'
	);

	const navItems = [
		{ href: '#home', key: 'nav.home' },
		{ href: '#about', key: 'nav.about' },
		{ href: '#experience', key: 'nav.experience' },
		{ href: '#projects', key: 'nav.projects' },
		{ href: '#certifications', key: 'nav.certifications' },
		{ href: '#contact', key: 'nav.contact' }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	function closeMenu() {
		isMenuOpen = false;
		document.body.style.overflow = '';
	}

	function handleNavClick(href: string) {
		closeMenu();
		// Smooth scroll for hash links
		if (href.startsWith('#')) {
			const element = document.querySelector(href);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth' });
			}
		}
	}

	function handleResize() {
		windowWidth = window.innerWidth;
		// Close menu when resizing to desktop
		if (windowWidth >= 1024 && isMenuOpen) {
			closeMenu();
		}
	}

	// Menu panel classes based on screen width
	const menuPanelClass = $derived(() => {
		if (windowWidth < 768) return 'full-screen';
		if (windowWidth < 1024) return 'half-screen';
		return '';
	});

	// Set up Intersection Observer to track active section
	onMount(() => {
		const observerOptions = {
			root: null,
			rootMargin: '-20% 0px -70% 0px',
			threshold: 0
		};

		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const id = entry.target.id;
					// Don't set contact section via observer
					if (id !== 'contact') {
						activeSection = id;
					}
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, observerOptions);

		// Observe all sections except contact
		const sections = document.querySelectorAll('section[id]');
		sections.forEach((section) => {
			if (section.id !== 'contact') {
				observer.observe(section);
			}
		});

		// Handle scroll to detect bottom of page for contact section
		const handleScroll = () => {
			const scrollHeight = document.documentElement.scrollHeight;
			const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			const clientHeight = document.documentElement.clientHeight;

			// Check if scrolled to bottom (with small threshold)
			if (scrollHeight - scrollTop - clientHeight < 50) {
				activeSection = 'contact';
			} else if (activeSection === 'contact') {
				// If we were at contact but scrolled up, check which section is visible
				const sections = document.querySelectorAll('section[id]');
				sections.forEach((section) => {
					const rect = section.getBoundingClientRect();
					const viewportHeight = window.innerHeight;
					// Check if section is in the middle portion of viewport
					if (
						rect.top < viewportHeight * 0.5 &&
						rect.bottom > viewportHeight * 0.5 &&
						section.id !== 'contact'
					) {
						activeSection = section.id;
					}
				});
			}
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			sections.forEach((section) => {
				if (section.id !== 'contact') {
					observer.unobserve(section);
				}
			});
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<svelte:window onresize={handleResize} />

<header class="navbar">
	<div class="navbar-container">
		<!-- Logo - links to LinkedIn -->
		<a
			href={linkedinUrl}
			class="logo"
			target={linkedinUrl !== '/' ? '_blank' : undefined}
			rel={linkedinUrl !== '/' ? 'noopener noreferrer' : undefined}
			onclick={() => closeMenu()}
		>
			<svg class="logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
				<defs>
					<linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
						<stop offset="0%" style="stop-color:#6366f1" />
						<stop offset="50%" style="stop-color:#8b5cf6" />
						<stop offset="100%" style="stop-color:#a78bfa" />
					</linearGradient>
				</defs>
				<!-- Background rounded square -->
				<rect x="2" y="2" width="44" height="44" rx="10" fill="url(#logoGradient)" />
				<!-- F letter - left side -->
				<path d="M10 12H24V17H15V21H22V26H15V36H10V12Z" fill="white" />
				<!-- T letter - right side, overlapping slightly -->
				<path d="M22 12H38V17H33V36H28V17H22V12Z" fill="white" opacity="0.85" />
			</svg>
		</a>

		<!-- Desktop Navigation -->
		<nav class="desktop-nav">
			{#each navItems as item}
				<a
					href={item.href}
					class="nav-link"
					class:active={activeSection === item.href.replace('#', '')}
					onclick={() => handleNavClick(item.href)}
				>
					{$_(item.key)}
				</a>
			{/each}
		</nav>

		<!-- Desktop Controls -->
		<div class="desktop-controls">
			<LanguageSwitcher />
			<ThemeToggle />
		</div>

		<!-- Mobile Hamburger Button -->
		<button
			class="hamburger"
			onclick={toggleMenu}
			aria-expanded={isMenuOpen}
			aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
		>
			<span class="hamburger-line" class:open={isMenuOpen}></span>
			<span class="hamburger-line" class:open={isMenuOpen}></span>
			<span class="hamburger-line" class:open={isMenuOpen}></span>
		</button>
	</div>
</header>

<!-- Mobile Menu Overlay -->
{#if isMenuOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="menu-overlay" onclick={closeMenu}></div>

	<div class="mobile-menu {menuPanelClass()}">
		<div class="mobile-menu-header">
			<a href="/" class="logo" onclick={() => closeMenu()} aria-label="Home">
				<svg class="logo-icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<linearGradient id="logoGradientMobile" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" style="stop-color:#6366f1" />
							<stop offset="50%" style="stop-color:#8b5cf6" />
							<stop offset="100%" style="stop-color:#a78bfa" />
						</linearGradient>
					</defs>
					<rect x="2" y="2" width="44" height="44" rx="10" fill="url(#logoGradientMobile)" />
					<path d="M10 12H24V17H15V21H22V26H15V36H10V12Z" fill="white" />
					<path d="M22 12H38V17H33V17H33V36H28V17H22V12Z" fill="white" opacity="0.85" />
				</svg>
			</a>
			<button class="close-button" onclick={closeMenu} aria-label="Close menu">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M18 6 6 18"></path>
					<path d="m6 6 12 12"></path>
				</svg>
			</button>
		</div>

		<nav class="mobile-nav">
			{#each navItems as item, index}
				<a
					href={item.href}
					class="mobile-nav-link"
					class:active={activeSection === item.href.replace('#', '')}
					onclick={() => handleNavClick(item.href)}
					style="animation-delay: {index * 50}ms"
				>
					{$_(item.key)}
				</a>
			{/each}
		</nav>

		<div class="mobile-controls">
			<LanguageSwitcher />
			<ThemeToggle />
		</div>
	</div>
{/if}

<style>
	.navbar {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: var(--bg-secondary);
		border-bottom: 1px solid var(--border-primary);
		backdrop-filter: blur(10px);
		background-color: color-mix(in srgb, var(--bg-secondary) 85%, transparent);
	}

	.navbar-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0 auto;
		padding: 1rem 1.5rem;
	}

	@media (min-width: 1248px) {
		.navbar-container {
			padding: 1rem 0;
			max-width: 1200px;
		}
	}

	.logo {
		text-decoration: none;
		z-index: 1001;
		display: flex;
		align-items: center;
	}

	.logo-icon {
		width: 44px;
		height: 44px;
		transition: transform 0.2s ease;
	}

	.logo:hover .logo-icon {
		transform: scale(1.08) rotate(5deg);
	}

	/* Desktop Navigation */
	.desktop-nav {
		display: none;
		gap: 0.5rem;
	}

	@media (min-width: 1024px) {
		.desktop-nav {
			display: flex;
		}
	}

	.nav-link {
		padding: 0.5rem 1rem;
		text-decoration: none;
		color: var(--text-secondary);
		font-size: 0.9rem;
		font-weight: 500;
		border-radius: 6px;
		transition: all 0.2s ease;
	}

	.nav-link:hover {
		color: var(--text-primary);
		background-color: var(--bg-tertiary);
	}

	.nav-link.active {
		color: var(--color-primary-500);
	}

	/* Desktop Controls */
	.desktop-controls {
		display: none;
		align-items: center;
		gap: 0.75rem;
	}

	@media (min-width: 1024px) {
		.desktop-controls {
			display: flex;
		}
	}

	/* Hamburger Button */
	.hamburger {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 40px;
		height: 40px;
		padding: 8px;
		background: none;
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		cursor: pointer;
		z-index: 1001;
	}

	@media (min-width: 1024px) {
		.hamburger {
			display: none;
		}
	}

	.hamburger-line {
		width: 100%;
		height: 2px;
		background-color: var(--text-primary);
		border-radius: 2px;
		transition: all 0.3s ease;
	}

	.hamburger-line.open:nth-child(1) {
		transform: translateY(7px) rotate(45deg);
	}

	.hamburger-line.open:nth-child(2) {
		opacity: 0;
	}

	.hamburger-line.open:nth-child(3) {
		transform: translateY(-7px) rotate(-45deg);
	}

	/* Menu Overlay */
	.menu-overlay {
		position: fixed;
		inset: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		animation: fadeIn 0.2s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Mobile Menu */
	.mobile-menu {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-secondary);
		z-index: 1000;
		animation: slideIn 0.3s ease-out;
		overflow-y: auto;
	}

	/* Full screen for < 768px */
	.mobile-menu.full-screen {
		left: 0;
		width: 100%;
	}

	/* Half screen for 768px - 1023px */
	.mobile-menu.half-screen {
		width: 50%;
		min-width: 320px;
		border-left: 1px solid var(--border-primary);
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	.mobile-menu-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		border-bottom: 1px solid var(--border-primary);
	}

	.close-button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		background: none;
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		color: var(--text-primary);
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.close-button:hover {
		background-color: var(--bg-tertiary);
	}

	.mobile-nav {
		display: flex;
		flex-direction: column;
		padding: 1.5rem;
		gap: 0.5rem;
		flex: 1;
	}

	.mobile-nav-link {
		padding: 1rem 1.5rem;
		text-decoration: none;
		color: var(--text-secondary);
		font-size: 1.125rem;
		font-weight: 500;
		border-radius: 8px;
		transition: all 0.2s ease;
		animation: slideUp 0.3s ease-out backwards;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.mobile-nav-link:hover {
		color: var(--text-primary);
		background-color: var(--bg-tertiary);
	}

	.mobile-nav-link.active {
		color: var(--color-primary-500);
		background-color: var(--bg-tertiary);
	}

	.mobile-controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1.5rem;
		border-top: 1px solid var(--border-primary);
	}
</style>
