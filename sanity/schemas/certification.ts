import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'certification',
	title: 'Certification',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Certification Title',
			type: 'object',
			fields: [
				{ name: 'en', type: 'string', title: 'English' },
				{ name: 'mk', type: 'string', title: 'Macedonian' }
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'issuer',
			title: 'Issuer / Provider',
			type: 'object',
			description: 'Who issued this certification (e.g., AWS, Unity, Google)',
			fields: [
				{ name: 'en', type: 'string', title: 'English' },
				{ name: 'mk', type: 'string', title: 'Macedonian' }
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'image',
			title: 'Certification Image',
			type: 'image',
			options: {
				hotspot: true
			},
			fields: [
				{
					name: 'alt',
					type: 'string',
					title: 'Alternative text',
					description: 'Important for SEO and accessibility'
				}
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'order',
			title: 'Display Order',
			type: 'number',
			initialValue: 0
		})
	],
	preview: {
		select: {
			title: 'title.en',
			issuer: 'issuer.en',
			media: 'image'
		},
		prepare({ title, issuer, media }) {
			return {
				title: title || 'Untitled',
				subtitle: issuer || '',
				media
			};
		}
	},
	orderings: [
		{
			title: 'Display Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }]
		}
	]
});
