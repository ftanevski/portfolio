import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// These values should be set in your .env file
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id';
const dataset = import.meta.env.VITE_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.VITE_SANITY_API_VERSION || '2024-01-01';

export const client = createClient({
	projectId,
	dataset,
	apiVersion,
	useCdn: true // Set to false if you need fresh data on every request
});

// Image URL builder
const builder = createImageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

// Helper to get localized content
export function getLocalizedValue<T>(
	obj: Record<string, T> | undefined,
	locale: string,
	fallbackLocale = 'en'
): T | undefined {
	if (!obj) return undefined;
	return obj[locale] ?? obj[fallbackLocale];
}
