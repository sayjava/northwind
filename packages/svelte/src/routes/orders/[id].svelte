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
		<div>
			<h3>Order No: #{order.Id}</h3>
		</div>

		<div>
			<div>
				<h3>Delivered To</h3>
				<div>
					<span>{order.Customer.ContactName}</span>
					<span>{order.Customer.ContactTitle}</span>
					<span>{order.Customer.Phone}</span>
				</div>
				<div>
					<h4>Address</h4>
					<div>
						<span>{order.ShippedDate}</span>
						<span>{order.ShipAddress}</span>
						<span>{order.ShipCity}</span>
						<span>{order.ShipRegion}</span>
						<span>{order.ShipPostalCode}</span>
						<span>{order.ShipCountry}</span>
					</div>
				</div>
				<div>
					<h4>Shipped By</h4>
					<div>
						<span>
							<a href={`/shippers/${order.ShippedBy.Id}`}>{order.ShippedBy.CompanyName}</a>
						</span>
						<span>{order.ShippedBy.Phone}</span>
					</div>
				</div>
			</div>
		</div>
		<Items items={order.items} freight={order.Freight} />
	</div>
{/if}

{#if error}
	<div>{error}</div>
{/if}
