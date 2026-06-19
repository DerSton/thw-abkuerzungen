<script lang="ts">
	import { resolve } from '$app/paths';
	import type { DefinedTerm, WithContext } from 'schema-dts';

	let { data } = $props();
	let entry = $derived(data.entry);

	let schema = $derived<WithContext<DefinedTerm>>({
		'@context': 'https://schema.org',
		'@type': 'DefinedTerm',
		name: entry.abbreviation,
		termCode: entry.abbreviation,
		description: entry.meaning,
		inDefinedTermSet: 'https://hiorg-abkuerzungen.de/'
	});
</script>

<svelte:head>
	<svelte:element this={"script"} type="application/ld+json">
		{JSON.stringify(schema)}
	</svelte:element>
</svelte:head>

<h1 class="h1 mb-4">{entry.abbreviation}</h1>
<p class="mb-2"><strong>Meaning:</strong> {entry.meaning}</p>
<p class="mb-2"><strong>Categories:</strong> {entry.categories || 'None'}</p>
<p class="mb-2"><strong>Organizations:</strong> {entry.organizations || 'None'}</p>
<p class="mb-4"><strong>Sources:</strong></p>
{#if entry.sources}
	<ul class="list-disc pl-5 mb-6">
		{#each entry.sources.split('|') as src (src)}
			<li class="mb-1">
				<!-- eslint-disable svelte/no-navigation-without-resolve -->
				<a
					href={src}
					target="_blank"
					rel="noopener noreferrer"
					class="text-primary-500 hover:underline">{src}</a
				>
				<!-- eslint-enable svelte/no-navigation-without-resolve -->
			</li>
		{/each}
	</ul>
{:else}
	<p class="mb-6">None</p>
{/if}

<p><a href={resolve('/')} class="btn preset-filled-primary-500">Back to list</a></p>
