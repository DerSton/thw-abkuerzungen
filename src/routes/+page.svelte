<script lang="ts">
	import abbreviations from '$lib/data/abbreviations.csv';
	import { slugify } from '$lib/utils';
	import { resolve } from '$app/paths';
</script>

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
