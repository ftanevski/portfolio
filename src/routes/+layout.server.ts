import type { LayoutServerLoad } from './$types';
import { getSiteSettings } from '$lib/sanity/queries';

export const load: LayoutServerLoad = async ({ request }) => {
	const settings = await getSiteSettings();

	// Get locale from URL or default to 'en'
	const url = new URL(request.url);
	const locale = url.searchParams.get('lang') || 'en';

	return {
		settings,
		locale
	};
};
