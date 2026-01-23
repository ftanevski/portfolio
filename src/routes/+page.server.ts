import type { PageServerLoad } from './$types';
import {
	getSiteSettings,
	getExperiences,
	getProjects,
	getCertifications
} from '$lib/sanity/queries';

export const load: PageServerLoad = async () => {
	const [settings, experiences, projects, certifications] = await Promise.all([
		getSiteSettings(),
		getExperiences(),
		getProjects(),
		getCertifications()
	]);

	return {
		settings,
		experiences,
		projects,
		certifications
	};
};
