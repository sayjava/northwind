<script lang="ts">
	import type { OrderItem } from 'src/api/graphql';

	const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
	export let items: OrderItem[] = [];
	export let freight: string = '0';

	const itemTotal = (item: OrderItem): number => {
		return (
			(parseFloat(item.UnitPrice) - item.Discount * parseFloat(item.UnitPrice)) * item.Quantity
		);
	};

	const subTotal = () => {
		return items.reduce((prev, cur) => {
			return prev + itemTotal(cur);
		}, 0);
	};
</script>

<div>
	<div>
		<h3>Order Items</h3>
		<table>
			<thead>
				<th>#</th>
				<th>Product</th>
				<th>Qty</th>
				<th>Price</th>
				<th>Discount</th>
				<th>Total</th>
			</thead>
			<tbody>
				{#each items as item}
					<tr>
						<td>{item.Id}</td>
						<td>
							<a href={`/product/${item.Product.Id}`}>
								{item.Product.ProductName}
							</a>
						</td>
						<td>{item.Quantity}</td>
						<td>{formatter.format(parseFloat(item.UnitPrice))}</td>
						<td>{formatter.format(item.Discount)}</td>
						<td>{formatter.format(itemTotal(item))}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<hr />
	<div>
		<div>
			<h3>Note</h3>
			<p>Some Notes about shipping</p>
		</div>
		<div>
			<dl>
				<dt>Sub Total</dt>
				<dd>{formatter.format(subTotal())}</dd>
			</dl>

			<dl>
				<dt>Shipping</dt>
				<dd>{formatter.format(parseFloat(freight))}</dd>
			</dl>

			<dl>
				<dt>Total</dt>
				<dd>{formatter.format(subTotal() + parseFloat(freight))}</dd>
			</dl>
		</div>
	</div>
</div>
