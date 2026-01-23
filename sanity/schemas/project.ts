import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'object',
			fields: [
				{ name: 'en', title: 'English', type: 'string' },
				{ name: 'mk', title: 'Macedonian', type: 'string' }
			],
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			title: 'Description',
			type: 'object',
			fields: [
				{ name: 'en', title: 'English', type: 'text', rows: 4 },
				{ name: 'mk', title: 'Macedonian', type: 'text', rows: 4 }
			]
		}),
		defineField({
			name: 'image',
			title: 'Project Image',
			type: 'image',
			options: {
				hotspot: true
			},
			fields: [
				{
					name: 'alt',
					title: 'Alt Text',
					type: 'string'
				}
			]
		}),
		defineField({
			name: 'technologies',
			title: 'Technologies',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags'
			}
		}),
		defineField({
			name: 'liveUrl',
			title: 'Live URL',
			type: 'url'
		}),
		defineField({
			name: 'featured',
			title: 'Featured Project',
			type: 'boolean',
			initialValue: false
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
			media: 'image',
			featured: 'featured'
		},
		prepare({ title, media, featured }) {
			return {
				title: title || 'Untitled',
				subtitle: featured ? 'Featured' : '',
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
