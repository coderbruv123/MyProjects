import React from 'react'

const Order = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Orders</h1>

      <div className="border rounded-lg shadow-md p-4 max-w-300 mx-auto">
        <h2 className="text-lg font-bold mb-2">Order #1</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="">
                <th className="border px-4 py-2 text-left">Order Id</th>
              <th className="border px-4 py-2 text-left">Products</th>
              <td className="border px-4 py-2 text-left">Total Price</td>
              <th className="border px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">Rs 20</td>
              <td className="border px-4 py-2">Pending</td>
            </tr>
      
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Order
