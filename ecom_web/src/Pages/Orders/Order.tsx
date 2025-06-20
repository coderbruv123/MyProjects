import React from 'react';

const Order = () => {
  const orders = [
    {
      id: 1,
      products: [
        { id: 1, name: 'Product 1', price: 'Rs 10', quantity: 2 },
        { id: 2, name: 'Product 2', price: 'Rs 10', quantity: 1 }
      ],
      totalPrice: 'Rs 20',
      status: 'Pending'
    },
    {
      id: 2,
      products: [
        { id: 1, name: 'Product 1', price: 'Rs 10', quantity: 2 },
        { id: 2, name: 'Product 2', price: 'Rs 10', quantity: 1 }
      ],
      totalPrice: 'Rs 30',
      status: 'Shipped'
    },
    {
      id: 3,
      products: [
        { id: 1, name: 'Product 1', price: 'Rs 10', quantity: 2 },
        { id: 2, name: 'Product 2', price: 'Rs 10', quantity: 1 }
      ],
      totalPrice: 'Rs 10',
      status: 'Delivered'
    }
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Orders</h1>

      <table className="w-full border-collapse border rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Order ID</th>
            <th className="border px-4 py-2 text-left">Products</th>
            <th className="border px-4 py-2 text-left">Total Price</th>
            <th className="border px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">
                <ul className="list-disc pl-5">
                  {order.products.map((product) => (
                    <li key={product.id}>
                      {product.name} (x{product.quantity})
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2">{order.totalPrice}</td>
              <td className="border px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
