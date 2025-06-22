import React, { useEffect, useState } from 'react';
import { getOrders } from '../../api/orderApi';
import type { Order } from '../../types/Order';

const Order = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders()
      .then((data) => {
        console.log(data);
        setOrders(data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Loading orders...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Orders</h1>

      <table className="w-full border-collapse border rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Order ID</th>
            <th className="border px-4 py-2 text-left">Items</th>
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
                  {order.orderItems.map((item) => (
                    <li>
                      {item.productName} (x{item.quantity})
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-4 py-2">Rs {order.totalAmount}</td>
              <td className="border px-4 py-2">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
