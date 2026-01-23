// Components
export { default as Navbar } from './components/Navbar.svelte';
export { default as Footer } from './components/Footer.svelte';
export { default as ThemeToggle } from './components/ThemeToggle.svelte';
export { default as LanguageSwitcher } from './components/LanguageSwitcher.svelte';

// Section Components
export { default as Hero } from './components/sections/Hero.svelte';
export { default as Experience } from './components/sections/Experience.svelte';
export { default as Projects } from './components/sections/Projects.svelte';
export { default as Skills } from './components/sections/Skills.svelte';
export { default as Contact } from './components/sections/Contact.svelte';

// Stores
export { theme } from './stores/theme';

// i18n
export { initI18n, setLocale, getLocale, locale, locales } from './i18n';

// Sanity
export { client, urlFor, getLocalizedValue } from './sanity/client';
export * from './sanity/queries';
