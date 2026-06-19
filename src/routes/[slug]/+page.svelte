<script lang="ts">
	import { resolve } from '$app/paths';
	let { data } = $props();
	let entry = $derived(data.entry);
</script>

<h1>{entry.abbreviation}</h1>
<p><strong>Meaning:</strong> {entry.meaning}</p>
<p><strong>Categories:</strong> {entry.categories || 'None'}</p>
<p><strong>Organizations:</strong> {entry.organizations || 'None'}</p>
<p><strong>Sources:</strong></p>
{#if entry.sources}
	<ul>
		{#each entry.sources.split('|') as src (src)}
			<li>
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href={src} target="_blank" rel="noopener noreferrer">{src}</a>
			</li>
		{/each}
	</ul>
{:else}
	<p>None</p>
{/if}

<p><a href={resolve('/')}>Back to list</a></p>
