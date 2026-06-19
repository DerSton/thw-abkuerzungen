<script lang="ts">
	import abbreviations from '$lib/data/abbreviations.csv';
	import { slugify } from '$lib/utils';
	import { resolve } from '$app/paths';
	import type { DefinedTermSet, WithContext } from 'schema-dts';

	let schema = $derived<WithContext<DefinedTermSet>>({
		'@context': 'https://schema.org',
		'@type': 'DefinedTermSet',
		'@id': 'https://hiorg-abkuerzungen.de/',
		name: 'HIOrg Abkürzungsverzeichnis',
		description:
			'Verzeichnis von Abkürzungen im Katastrophenschutz, THW, Feuerwehr und Sanitätsdiensten.'
	});
</script>

<svelte:head>
	<svelte:element this={"script"} type="application/ld+json">
		{JSON.stringify(schema)}
	</svelte:element>
</svelte:head>

<h1 class="h1 mb-4">Abbreviations</h1>

<div class="table-container">
	<table class="table">
		<thead>
			<tr>
				<th>Abbreviation</th>
				<th>Meaning</th>
				<th>Categories</th>
				<th>Sources</th>
				<th>Organizations</th>
			</tr>
		</thead>
		<tbody>
			{#each abbreviations as entry (entry.abbreviation)}
				<tr>
					<td>
						<a
							href={resolve('/[slug]', { slug: slugify(`${entry.abbreviation} ${entry.meaning}`) })}
							class="text-primary-500 hover:underline"
						>
							{entry.abbreviation}
						</a>
					</td>
					<td>{entry.meaning}</td>
					<td>{entry.categories}</td>
					<td>{entry.sources}</td>
					<td>{entry.organizations}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
