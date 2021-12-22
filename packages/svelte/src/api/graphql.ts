import { GraphQLClient, gql } from 'graphql-request';
// @ts-ignore
export const client = new GraphQLClient(import.meta.env.VITE_API_ENDPOINT);

export interface Order {
	Id: string;
	CustomerId: string;
	Freight: string;
	ShipName: string;
	ShipAddress: string;
	ShippedDate: string;
	ShipCity: string;
	ShipRegion: string;
	ShipPostalCode: string;
	ShipCountry: string;
}

export interface OrderItem {
	Id: string;
	Quantity: number;
	UnitPrice: string;
	Discount: number;
	Product: {
		Id: string;
		ProductName: string;
	};
}

export const getOrder = async (id: any): Promise<Order> => {
	const query = gql`
		query getOrder($id: Int) {
			orders(where: { Id: { equals: $id } }) {
				Id
				CustomerId
				ShipName
				ShippedDate
				ShipAddress
				ShipCity
				ShipCountry
				ShipRegion
				ShipPostalCode
				Freight

				ShippedBy {
					Id
					CompanyName
					Phone
				}

				Customer {
					ContactName
					ContactTitle
					Phone
				}

				items: OrderDetail {
					Id
					Quantity
					UnitPrice
					Discount
					Product {
						Id
						ProductName
					}
				}
			}
		}
	`;

	const { orders } = await client.request(query, { id: parseInt(id) });
	const [order] = orders;
	return order;
};
