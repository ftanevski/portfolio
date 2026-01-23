<script lang="ts">
	import Hero from '$lib/components/sections/Hero.svelte';
	import About from '$lib/components/sections/About.svelte';
	import Experience from '$lib/components/sections/Experience.svelte';
	import Projects from '$lib/components/sections/Projects.svelte';
	import Certifications from '$lib/components/sections/Certifications.svelte';
	import Contact from '$lib/components/sections/Contact.svelte';
	import { locale } from '$lib/i18n';
	import { getLocalizedValue, urlFor } from '$lib/sanity/queries';

	interface Props {
		data: import('./$types').PageData;
	}

	let { data }: Props = $props();

	const currentLocale = $derived($locale || 'en');
	const settings = $derived(data.settings);

	// SEO values with fallbacks
	const seoTitle = $derived(
		getLocalizedValue(settings?.seoTitle, currentLocale) || 'Filip Tanevski | Cloud Developer'
	);
	const seoDescription = $derived(
		getLocalizedValue(settings?.seoDescription, currentLocale) ||
			'Cloud Developer & Web Engineer portfolio'
	);
	const seoKeywords = $derived(settings?.seoKeywords?.join(', ') || '');
	const seoImageUrl = $derived(
		settings?.seoImage ? urlFor(settings.seoImage).width(1200).height(630).url() : ''
	);
	const canonicalUrl = $derived(settings?.siteUrl || '');
	const authorName = $derived(settings?.authorName || 'Filip Tanevski');
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{seoTitle}</title>
	<meta name="title" content={seoTitle} />
	<meta name="description" content={seoDescription} />
	{#if seoKeywords}
		<meta name="keywords" content={seoKeywords} />
	{/if}
	<meta name="author" content={authorName} />
	<meta name="robots" content="index, follow" />
	<meta name="language" content={currentLocale === 'mk' ? 'Macedonian' : 'English'} />

	<!-- Canonical URL -->
	{#if canonicalUrl}
		<link rel="canonical" href={canonicalUrl} />
	{/if}

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={seoTitle} />
	<meta property="og:description" content={seoDescription} />
	{#if canonicalUrl}
		<meta property="og:url" content={canonicalUrl} />
	{/if}
	{#if seoImageUrl}
		<meta property="og:image" content={seoImageUrl} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="630" />
	{/if}
	<meta property="og:locale" content={currentLocale === 'mk' ? 'mk_MK' : 'en_US'} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={seoTitle} />
	<meta name="twitter:description" content={seoDescription} />
	{#if seoImageUrl}
		<meta name="twitter:image" content={seoImageUrl} />
	{/if}

	<!-- Google Search Console Verification -->
	{#if settings?.googleVerification}
		<meta name="google-site-verification" content={settings.googleVerification} />
	{/if}

	<!-- Structured Data (JSON-LD) -->
	{@html `<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "Person",
			"name": "${authorName}",
			"url": "${canonicalUrl}",
			"jobTitle": "${getLocalizedValue(settings?.heroSubtitle, currentLocale) || 'Cloud Developer'}",
			"description": "${seoDescription}",
			${seoImageUrl ? `"image": "${seoImageUrl}",` : ''}
			"sameAs": [
				${settings?.socialLinks?.map((link) => `"${link.url}"`).join(',\n\t\t\t\t') || ''}
			]
		}
	</script>`}
</svelte:head>

<Hero settings={data.settings} />
<About settings={data.settings} />
<Experience experiences={data.experiences} resumeUrl={data.settings?.resumeUrl} />
<Projects projects={data.projects} />
<Certifications certifications={data.certifications} settings={data.settings} />
<Contact settings={data.settings} />
