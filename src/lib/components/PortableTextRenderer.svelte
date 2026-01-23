<script lang="ts">
	import type { PortableTextBlock } from '$lib/sanity/queries';

	interface Props {
		value: PortableTextBlock[];
	}

	let { value }: Props = $props();

	function renderText(
		text: string,
		marks: string[] = [],
		markDefs: Array<{ _key: string; _type: string; href?: string }> = []
	): string {
		let result = text;

		// Find link marks
		const linkMark = marks.find((mark) => {
			const def = markDefs.find((d) => d._key === mark);
			return def && def._type === 'link';
		});

		if (linkMark) {
			const linkDef = markDefs.find((d) => d._key === linkMark);
			if (linkDef?.href) {
				result = `<a href="${linkDef.href}" target="_blank" rel="noopener noreferrer">${result}</a>`;
			}
		}

		// Apply decorators
		if (marks.includes('strong')) {
			result = `<strong>${result}</strong>`;
		}
		if (marks.includes('em')) {
			result = `<em>${result}</em>`;
		}
		if (marks.includes('underline')) {
			result = `<u>${result}</u>`;
		}

		return result;
	}

	function renderBlock(block: PortableTextBlock): string {
		if (block._type !== 'block' || !block.children) return '';

		const content = block.children
			.map((child) => {
				if (child._type === 'span') {
					return renderText(child.text, child.marks, block.markDefs);
				}
				return '';
			})
			.join('');

		return `<p>${content}</p>`;
	}
</script>

{#each value as block}
	{@html renderBlock(block)}
{/each}
