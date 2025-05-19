import { useState } from "react";
import { ShoppingBagIcon, PlusCircle } from "lucide-react";

const Cart = () => {
  const [carts, setCarts] = useState([
    { id: 1, name: "Cart 1", items: [] },
  ]);

  const addCart = () => {
    const newId = carts.length + 1;
    setCarts([...carts, { id: newId, name: `Cart ${newId}`, items: [] }]);
  };

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <h1 className="text-5xl flex items-center justify-center">
        <ShoppingBagIcon size={45} /> My Carts
      </h1>

      <button
        onClick={addCart}
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded w-fit self-center hover:bg-blue-700 transition"
      >
        <PlusCircle size={20} /> Add Cart
      </button>

      <div className="flex flex-col gap-4">
        {carts.map((cart) => (
          <div key={cart.id} className="bg-white rounded shadow p-4">
            <h2 className="bg-blue-400 text-white px-2 py-1 rounded">{cart.name}</h2>
            <div>
              {/* Render cart items here */}
              {cart.items.length === 0 ? (
                <p className="text-gray-500 mt-2">No items in this cart.</p>
              ) : (
                <ul>
                  {cart.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;