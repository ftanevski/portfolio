import { browser } from '$app/environment';
import { init, register, getLocaleFromNavigator, locale } from 'svelte-i18n';

// Register languages
register('en', () => import('./en.json'));
register('mk', () => import('./mk.json'));

// Initialize i18n
export function initI18n() {
	init({
		fallbackLocale: 'en',
		initialLocale: browser ? getStoredLocale() || getLocaleFromNavigator() || 'en' : 'en'
	});
}

// Get stored locale from localStorage
function getStoredLocale(): string | null {
	if (!browser) return null;
	return localStorage.getItem('locale');
}

// Set and persist locale
export function setLocale(newLocale: string) {
	if (browser) {
		localStorage.setItem('locale', newLocale);
		// Set cookie for server-side lang attribute
		document.cookie = `locale=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
	}
	locale.set(newLocale);
}

// Get current locale
export function getLocale(): string {
	let currentLocale = 'en';
	locale.subscribe((value) => {
		if (value) currentLocale = value;
	})();
	return currentLocale;
}

// Available locales
export const locales = [
	{ code: 'en', name: 'English', flag: '🇬🇧' },
	{ code: 'mk', name: 'Македонски', flag: '🇲🇰' }
];

// Re-export useful functions
export { locale } from 'svelte-i18n';
