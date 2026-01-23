import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Get locale from cookie or default to 'en'
	const locale = event.cookies.get('locale') || 'en';

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace('%sveltekit.lang%', locale);
		}
	});
};
