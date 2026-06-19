import type { EntryGenerator, PageLoad } from './$types';
import abbreviations from '$lib/data/abbreviations.csv';
import { slugify } from '$lib/utils';
import { error } from '@sveltejs/kit';

export const entries: EntryGenerator = () => {
	return abbreviations.map((entry) => ({
		slug: slugify(`${entry.abbreviation} ${entry.meaning}`)
	}));
};

export const load: PageLoad = ({ params }) => {
	const entry = abbreviations.find(
		(item) => slugify(`${item.abbreviation} ${item.meaning}`) === params.slug
	);

	if (!entry) {
		throw error(404, 'Abbreviation not found');
	}

	return {
		entry
	};
};
