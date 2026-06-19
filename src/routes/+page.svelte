<script lang="ts">
	import abbreviations from '$lib/data/abbreviations.csv';
</script>

<h1>Abbreviations</h1>

<table>
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
				<td>{entry.abbreviation}</td>
				<td>{entry.meaning}</td>
				<td>{entry.categories}</td>
				<td>{entry.sources}</td>
				<td>{entry.organizations}</td>
			</tr>
		{/each}
	</tbody>
</table>
