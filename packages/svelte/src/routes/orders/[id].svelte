<script>
	import { page } from '$app/stores';
	import Items from '$lib/orders/items.svelte';
	import { getOrder } from '../../api/graphql';

	let order;
	let error;

	const id = $page.params.id;

	getOrder(id)
		.then((result) => (order = result))
		.catch((e) => (error = e));

	console.log(order);
</script>

{#if !error && order === undefined}
	<div>Loading .. ... . .</div>
{/if}

{#if order === null}
	<div>Order {id} not found</div>
{/if}

{#if order}
	<div>
		<Items items={order.items} freight={order.Freight} />
	</div>
{/if}

{#if error}
	<div>{error}</div>
{/if}
