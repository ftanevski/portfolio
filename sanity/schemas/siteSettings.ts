import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'siteSettings',
	title: 'Site Settings',
	type: 'document',
	fields: [
		// === SEO SETTINGS ===
		defineField({
			name: 'seoTitle',
			title: 'SEO Title',
			type: 'object',
			description: 'The title shown in browser tabs and search results (50-60 characters ideal)',
			fields: [
				{ name: 'en', title: 'English', type: 'string' },
				{ name: 'mk', title: 'Macedonian', type: 'string' }
			]
		}),
		defineField({
			name: 'seoDescription',
			title: 'SEO Description',
			type: 'object',
			description: 'Meta description for search engines (150-160 characters ideal)',
			fields: [
				{ name: 'en', title: 'English', type: 'text', rows: 2 },
				{ name: 'mk', title: 'Macedonian', type: 'text', rows: 2 }
			]
		}),
		defineField({
			name: 'seoKeywords',
			title: 'SEO Keywords',
			type: 'array',
			description: 'Keywords for search engines (comma-separated topics you want to rank for)',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags'
			}
		}),
		defineField({
			name: 'seoImage',
			title: 'SEO / Social Share Image',
			type: 'image',
			description: 'Image shown when shared on social media (1200x630px recommended)',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'siteUrl',
			title: 'Site URL',
			type: 'url',
			description: 'Your canonical site URL (e.g., https://filipt.dev)'
		}),
		defineField({
			name: 'authorName',
			title: 'Author Name',
			type: 'string',
			description: 'Your full name for meta tags'
		}),
		defineField({
			name: 'googleVerification',
			title: 'Google Search Console Verification',
			type: 'string',
			description: 'Google Search Console verification code (optional)'
		}),
		// === GENERAL SETTINGS ===
		defineField({
			name: 'heroTitle',
			title: 'Hero Title (Your Name)',
			type: 'object',
			fields: [
				{ name: 'en', title: 'English', type: 'string' },
				{ name: 'mk', title: 'Macedonian', type: 'string' }
			]
		}),
		defineField({
			name: 'heroSubtitle',
			title: 'Hero Subtitle (Your Role)',
			type: 'object',
			fields: [
				{ name: 'en', title: 'English', type: 'string' },
				{ name: 'mk', title: 'Macedonian', type: 'string' }
			]
		}),
		defineField({
			name: 'heroTagline',
			title: 'Hero Tagline',
			type: 'object',
			description: 'Rich text - use bold, italic, underline, and line breaks',
			fields: [
				{
					name: 'en',
					title: 'English',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [{ title: 'Normal', value: 'normal' }],
							marks: {
								decorators: [
									{ title: 'Bold', value: 'strong' },
									{ title: 'Italic', value: 'em' },
									{ title: 'Underline', value: 'underline' }
								],
								annotations: [
									{
										name: 'link',
										type: 'object',
										title: 'Link',
										fields: [{ name: 'href', type: 'url', title: 'URL' }]
									}
								]
							}
						}
					]
				},
				{
					name: 'mk',
					title: 'Macedonian',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [{ title: 'Normal', value: 'normal' }],
							marks: {
								decorators: [
									{ title: 'Bold', value: 'strong' },
									{ title: 'Italic', value: 'em' },
									{ title: 'Underline', value: 'underline' }
								],
								annotations: [
									{
										name: 'link',
										type: 'object',
										title: 'Link',
										fields: [{ name: 'href', type: 'url', title: 'URL' }]
									}
								]
							}
						}
					]
				}
			]
		}),
		defineField({
			name: 'aboutText',
			title: 'About Me Text',
			type: 'object',
			description: 'Rich text editor - use formatting, links, and line breaks',
			fields: [
				{
					name: 'en',
					title: 'English',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [{ title: 'Normal', value: 'normal' }],
							marks: {
								decorators: [
									{ title: 'Bold', value: 'strong' },
									{ title: 'Italic', value: 'em' },
									{ title: 'Underline', value: 'underline' }
								],
								annotations: [
									{
										name: 'link',
										type: 'object',
										title: 'Link',
										fields: [
											{
												name: 'href',
												type: 'url',
												title: 'URL'
											}
										]
									}
								]
							}
						}
					]
				},
				{
					name: 'mk',
					title: 'Macedonian',
					type: 'array',
					of: [
						{
							type: 'block',
							styles: [{ title: 'Normal', value: 'normal' }],
							marks: {
								decorators: [
									{ title: 'Bold', value: 'strong' },
									{ title: 'Italic', value: 'em' },
									{ title: 'Underline', value: 'underline' }
								],
								annotations: [
									{
										name: 'link',
										type: 'object',
										title: 'Link',
										fields: [
											{
												name: 'href',
												type: 'url',
												title: 'URL'
											}
										]
									}
								]
							}
						}
					]
				}
			]
		}),
		defineField({
			name: 'profileImage',
			title: 'Profile Image',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'certificationsDescription',
			title: 'Certifications Description',
			type: 'object',
			description: 'A short paragraph about your certifications',
			fields: [
				{ name: 'en', title: 'English', type: 'text', rows: 3 },
				{ name: 'mk', title: 'Macedonian', type: 'text', rows: 3 }
			]
		}),
		defineField({
			name: 'email',
			title: 'Email Address',
			type: 'string'
		}),
		defineField({
			name: 'resumeUrl',
			title: 'Resume URL',
			type: 'url'
		}),
		defineField({
			name: 'socialLinks',
			title: 'Social Links',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							name: 'platform',
							title: 'Platform',
							type: 'string',
							options: {
								list: [
									{ title: 'GitHub', value: 'github' },
									{ title: 'LinkedIn', value: 'linkedin' },
									{ title: 'YouTube', value: 'youtube' },
									{ title: 'Twitch', value: 'twitch' },
									{ title: 'CodePen', value: 'codepen' },
									{ title: 'Instagram', value: 'instagram' },
									{ title: 'Discord', value: 'discord' }
								]
							}
						},
						{
							name: 'url',
							title: 'URL',
							type: 'url'
						}
					]
				}
			]
		})
	],
	preview: {
		prepare() {
			return {
				title: 'Site Settings'
			};
		}
	}
});
