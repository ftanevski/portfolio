import { client, getLocalizedValue } from './client';

// Types for Sanity data
export interface SiteSettings {
	// SEO
	seoTitle: Record<string, string>;
	seoDescription: Record<string, string>;
	seoKeywords?: string[];
	seoImage?: SanityImage;
	siteUrl?: string;
	authorName?: string;
	googleVerification?: string;
	// General
	heroTitle: Record<string, string>;
	heroSubtitle: Record<string, string>;
	heroTagline: Record<string, PortableTextBlock[]>;
	aboutText: Record<string, PortableTextBlock[]>;
	profileImage?: SanityImage;
	certificationsDescription?: Record<string, string>;
	socialLinks: SocialLink[];
	email: string;
	resumeUrl?: string;
}

// Portable Text block type
export interface PortableTextBlock {
	_type: string;
	_key: string;
	children?: Array<{
		_type: string;
		_key: string;
		text: string;
		marks?: string[];
	}>;
	markDefs?: Array<{
		_type: string;
		_key: string;
		href?: string;
	}>;
	style?: string;
}

export interface SocialLink {
	platform: string;
	url: string;
	icon: string;
}

export interface Project {
	_id: string;
	title: Record<string, string>;
	description: Record<string, string>;
	image?: SanityImage;
	technologies: string[];
	liveUrl?: string;
	featured: boolean;
	order: number;
}

export interface Experience {
	_id: string;
	type: 'fulltime' | 'internship' | 'education';
	title?: Record<string, string>;
	organization?: Record<string, string>;
	university?: Record<string, string>;
	startDate?: string;
	endDate?: string;
	current?: boolean;
	technologies?: string[];
	order: number;
}

export interface Certification {
	_id: string;
	title: Record<string, string>;
	issuer: Record<string, string>;
	image: SanityImage;
	order: number;
}

export interface SanityImage {
	_type: 'image';
	asset: {
		_ref: string;
		_type: 'reference';
	};
	alt?: string;
}

// GROQ Queries
const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  seoTitle,
  seoDescription,
  seoKeywords,
  seoImage,
  siteUrl,
  authorName,
  googleVerification,
  heroTitle,
  heroSubtitle,
  heroTagline,
  aboutText,
  profileImage,
  certificationsDescription,
  socialLinks[]{
    platform,
    url,
    icon
  },
  email,
  resumeUrl
}`;

const projectsQuery = `*[_type == "project"] | order(order asc){
  _id,
  title,
  description,
  image,
  technologies,
  liveUrl,
  featured,
  order
}`;

const experiencesQuery = `*[_type == "experience"] | order(order asc){
  _id,
  type,
  title,
  organization,
  university,
  startDate,
  endDate,
  current,
  technologies,
  order
}`;

const certificationsQuery = `*[_type == "certification"] | order(order asc){
  _id,
  title,
  issuer,
  image,
  order
}`;

// Fetch functions
export async function getSiteSettings(): Promise<SiteSettings | null> {
	return await client.fetch(siteSettingsQuery);
}

export async function getProjects(): Promise<Project[]> {
	return await client.fetch(projectsQuery);
}

export async function getFeaturedProjects(): Promise<Project[]> {
	const projects = await getProjects();
	return projects.filter((p) => p.featured);
}

export async function getExperiences(): Promise<Experience[]> {
	return await client.fetch(experiencesQuery);
}

export async function getExperiencesByType(
	type: 'work' | 'education' | 'extracurricular'
): Promise<Experience[]> {
	const experiences = await getExperiences();
	return experiences.filter((e) => e.type === type);
}

export async function getCertifications(): Promise<Certification[]> {
	return await client.fetch(certificationsQuery);
}

// Re-export helpers
export { getLocalizedValue, urlFor } from './client';
