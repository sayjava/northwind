<script lang="ts">
	import { navigating } from '$app/stores';
	import Indicator from '$lib/indicator.svelte';
	import Nav from '$lib/nav.svelte';

	import '../app.css';
</script>

{#if $navigating}
	<Indicator />
{/if}

<svelte:head>
	<title>NorthWind Store</title>
</svelte:head>

<Nav />
<main>
	<slot />
</main>
