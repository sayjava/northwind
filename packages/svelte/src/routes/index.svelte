<script lang="ts">
	import { GraphQLClient, gql } from 'graphql-request';
	import { onMount } from 'svelte';

	const DEFAULT_QUERY = gql`
		{
			orders(take: 10, orderBy: { OrderDate: desc }) {
				Id
				CustomerId
				RequiredDate
				OrderDate
				ShippedDate
				ShipCountry
				ShipRegion
				Customer {
					ContactName
				}
				Employee {
					Id
					LastName
				}
				ShippedBy {
					Id
					CompanyName
				}
			}
		}
	`;

	let orders: any[];
	let error: any;

	const loadOrders = async (query: string) => {
		try {
			// @ts-ignore
			const client = new GraphQLClient(import.meta.env.VITE_API_ENDPOINT);
			const data = await client.request(query);
			orders = data.orders;
		} catch (err) {
			console.error(err);
			error = err;
		}
	};

	onMount(() => loadOrders(DEFAULT_QUERY));
</script>

{#if orders}
	<div class="card">
		<h3 class="title">Orders</h3>
		<table class="bordered">
			<thead>
				<tr>
					<th>Id</th>
					<th>Order Date</th>
					<th>Shipped Date</th>
					<th>Customer</th>
					<th>Sales Person</th>
					<th>Country</th>
					<th>Shipped By</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each orders as order}
					<tr>
						<td>{order.Id}</td>
						<td>{order.OrderDate.split(' ')[0]}</td>
						<td>{order.ShippedDate.split(' ')[0]}</td>
						<td>
							<a href={`/employee/${order.Customer.Id}`}>
								{order.Customer.ContactName}
							</a>
						</td>
						<td>
							<a href={`/employee/${order.Employee.Id}`}>
								{order.Employee.LastName}
							</a>
						</td>
						<td>
							{order.ShipCountry}
						</td>
						<td>
							<a href={`/shipped/${order.ShippedBy.Id}`}>
								{order.ShippedBy.CompanyName}
							</a>
						</td>
						<td>
							<a role="button" class="outline" href={`/orders/${order.Id}`}> Details </a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{/if}

{#if error}
	<div class="alert alert-error">
		{error.message}
	</div>
{/if}
