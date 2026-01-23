import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { codeInput } from '@sanity/code-input';
import { schemaTypes } from './schemas';

export default defineConfig({
	name: 'portfolio',
	title: 'Portfolio CMS',

	// Replace with your Sanity project ID and dataset
	projectId: 'sbsgsi8m',
	dataset: 'production',

	plugins: [
		structureTool({
			structure: (S) =>
				S.list()
					.title('Content')
					.items([
						// Site Settings as singleton
						S.listItem()
							.title('Site Settings')
							.id('siteSettings')
							.child(S.document().schemaType('siteSettings').documentId('siteSettings')),
						S.divider(),
						// Projects
						S.documentTypeListItem('project').title('Projects'),
						// Experience
						S.documentTypeListItem('experience').title('Experience'),
						// Certifications
						S.documentTypeListItem('certification').title('Certifications')
					])
		}),
		codeInput()
	],

	schema: {
		types: schemaTypes
	}
});
