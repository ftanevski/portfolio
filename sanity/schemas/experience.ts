import { defineField, defineType } from 'sanity';

export default defineType({
	name: 'experience',
	title: 'Experience',
	type: 'document',
	fields: [
		defineField({
			name: 'type',
			title: 'Type',
			type: 'string',
			options: {
				list: [
					{ title: 'Full Time', value: 'fulltime' },
					{ title: 'Internship', value: 'internship' },
					{ title: 'Education', value: 'education' }
				],
				layout: 'radio'
			},
			validation: (Rule) => Rule.required()
		}),
		// Position - for Full Time and Internship
		defineField({
			name: 'title',
			title: 'Position',
			type: 'object',
			description: 'Your job title/position',
			fields: [
				{ name: 'en', title: 'English', type: 'string' },
				{ name: 'mk', title: 'Macedonian', type: 'string' }
			],
			hidden: ({ document }) => document?.type === 'education'
		}),
		// Company Name - for Full Time and Internship
		defineField({
			name: 'organization',
			title: 'Company Name',
			type: 'object',
			fields: [
				{ name: 'en', title: 'English', type: 'string' },
				{ name: 'mk', title: 'Macedonian', type: 'string' }
			],
			hidden: ({ document }) => document?.type === 'education'
		}),
		// University Name - for Education only
		defineField({
			name: 'university',
			title: 'University Name',
			type: 'object',
			fields: [
				{ name: 'en', title: 'English', type: 'string' },
				{ name: 'mk', title: 'Macedonian', type: 'string' }
			],
			hidden: ({ document }) => document?.type !== 'education'
		}),
		// Start Date - for Full Time and Internship
		defineField({
			name: 'startDate',
			title: 'Start Date',
			type: 'date',
			options: {
				dateFormat: 'MMM YYYY'
			},
			hidden: ({ document }) => document?.type === 'education'
		}),
		// End Date - for Full Time and Internship (hidden if current)
		defineField({
			name: 'endDate',
			title: 'End Date',
			type: 'date',
			options: {
				dateFormat: 'MMM YYYY'
			},
			hidden: ({ document }) =>
				document?.type === 'education' || document?.current === true
		}),
		// Current Position - for Full Time only
		defineField({
			name: 'current',
			title: 'Current Position',
			type: 'boolean',
			description: 'Check if you are currently working here',
			initialValue: false,
			hidden: ({ document }) => document?.type !== 'fulltime'
		}),
		// Technologies - for Full Time and Internship
		defineField({
			name: 'technologies',
			title: 'Technologies Used',
			type: 'array',
			of: [{ type: 'string' }],
			options: {
				layout: 'tags'
			},
			hidden: ({ document }) => document?.type === 'education'
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
			organization: 'organization.en',
			university: 'university.en',
			type: 'type',
			current: 'current'
		},
		prepare({ title, organization, university, type, current }) {
			const typeLabels: Record<string, string> = {
				fulltime: 'Full Time',
				internship: 'Internship',
				education: 'Education'
			};
			const displayTitle = type === 'education' ? university : title;
			const displayOrg = type === 'education' ? '' : organization;
			const currentLabel = current ? ' (Current)' : '';
			return {
				title: displayTitle || 'Untitled',
				subtitle: `${typeLabels[type] || type}${displayOrg ? ' - ' + displayOrg : ''}${currentLabel}`
			};
		}
	},
	orderings: [
		{
			title: 'Display Order',
			name: 'orderAsc',
			by: [{ field: 'order', direction: 'asc' }]
		},
		{
			title: 'Start Date (newest)',
			name: 'startDateDesc',
			by: [{ field: 'startDate', direction: 'desc' }]
		}
	]
});
