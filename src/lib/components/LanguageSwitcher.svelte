<script lang="ts">
	import { locale, locales, setLocale } from '$lib/i18n';

	let isOpen = $state(false);

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function selectLocale(code: string) {
		setLocale(code);
		isOpen = false;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.language-switcher')) {
			isOpen = false;
		}
	}

	$effect(() => {
		if (isOpen) {
			document.addEventListener('click', handleClickOutside);
			return () => document.removeEventListener('click', handleClickOutside);
		}
	});

	const currentLocale = $derived(locales.find((l) => l.code === $locale) || locales[0]);

	// SVG Flag components
	const flags: Record<string, string> = {
		// United Kingdom flag
		en: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>`,
		// North Macedonia flag
		mk: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#c8342d"></rect><path d="M11.847,17.909L1,23.424v.576c0,.835,.257,1.609,.695,2.251l10.676-7.484c-.203-.266-.382-.55-.524-.857Z" fill="#f4e959"></path><path d="M11.417,16c0-.155,.031-.302,.046-.454L1,14.5v3l10.463-1.046c-.015-.151-.046-.298-.046-.454Z" fill="#f4e959"></path><path d="M16,11.417c.171,0,.333,.032,.499,.05l1.901-7.467h-4.8l1.901,7.467c.166-.018,.328-.05,.499-.05Z" fill="#f4e959"></path><circle cx="16" cy="16" r="3.75" fill="#f4e959"></circle><path d="M12.371,13.233L1.695,5.749c-.438,.641-.695,1.416-.695,2.251v.576l10.847,5.515c.142-.307,.32-.591,.524-.857Z" fill="#f4e959"></path><path d="M20.583,16c0,.155-.031,.302-.046,.454l10.463,1.046v-3l-10.463,1.046c.015,.151,.046,.298,.046,.454Z" fill="#f4e959"></path><path d="M30.305,5.749l-10.676,7.484c.203,.266,.382,.55,.524,.857l10.847-5.515v-.576c0-.835-.257-1.609-.695-2.251Z" fill="#f4e959"></path><path d="M16,20.583c-.171,0-.333-.032-.499-.05l-1.901,7.467h4.8l-1.901-7.467c-.166,.018-.328,.05-.499,.05Z" fill="#f4e959"></path><path d="M19.629,18.767l10.676,7.484c.438-.641,.695-1.416,.695-2.251v-.576l-10.847-5.515c-.142,.307-.32,.591-.524,.857Z" fill="#f4e959"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>`
	};
</script>

<div class="language-switcher">
	<button
		class="switcher-button"
		onclick={toggleDropdown}
		aria-expanded={isOpen}
		aria-haspopup="listbox"
		aria-label="Select language"
	>
		<span class="flag">{@html flags[currentLocale.code]}</span>
		<span class="code">{currentLocale.code.toUpperCase()}</span>
		<svg
			class="chevron"
			class:rotated={isOpen}
			xmlns="http://www.w3.org/2000/svg"
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="m6 9 6 6 6-6"></path>
		</svg>
	</button>

	{#if isOpen}
		<ul class="dropdown" role="listbox">
			{#each locales as loc}
				<li role="option" aria-selected={$locale === loc.code}>
					<button
						class="dropdown-item"
						class:active={$locale === loc.code}
						onclick={() => selectLocale(loc.code)}
					>
						<span class="flag">{@html flags[loc.code]}</span>
						<span class="name">{loc.name}</span>
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.language-switcher {
		position: relative;
	}

	.switcher-button {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 8px 12px;
		background-color: transparent;
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		color: var(--text-primary);
		font-size: 0.875rem;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.switcher-button:hover {
		background-color: var(--bg-tertiary);
		border-color: var(--border-secondary);
	}

	.flag {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 20px;
		border-radius: 3px;
		overflow: hidden;
		box-shadow:
			0 0 0 1px rgba(0, 0, 0, 0.1),
			0 1px 2px rgba(0, 0, 0, 0.1);
		flex-shrink: 0;
		position: relative;
	}

	.flag :global(svg) {
		position: absolute;
		width: 34px;
		height: 34px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.code {
		font-weight: 500;
	}

	.chevron {
		transition: transform 0.2s ease;
	}

	.chevron.rotated {
		transform: rotate(180deg);
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 4px);
		right: 0;
		min-width: 150px;
		padding: 4px;
		margin: 0;
		list-style: none;
		background-color: var(--bg-card);
		border: 1px solid var(--border-primary);
		border-radius: 8px;
		box-shadow: var(--shadow-lg);
		z-index: 100;
		animation: fadeIn 0.15s ease-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-4px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 8px 12px;
		background: none;
		border: none;
		border-radius: 6px;
		color: var(--text-primary);
		font-size: 0.875rem;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.dropdown-item:hover {
		background-color: var(--bg-tertiary);
	}

	.dropdown-item.active {
		background-color: var(--color-primary-500);
		color: white;
	}

	.name {
		font-weight: 500;
	}
</style>
