import { useEffect, useState } from "react";
import { ShoppingBagIcon, PlusCircle } from "lucide-react";
import { getCart, addCart } from "../../api/cartApi";
import type { Cart, CartItem } from "../../types/Cart";

const CartPage = () => {
  const [carts, setCarts] = useState<Cart[] | null>(null);

  const fetchCart = async () => {
    try {
      const fetchedCarts = await getCart();
      setCarts(fetchedCarts);
    } catch (error) {
      setCarts(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddCart = async () => {
    try {
      await addCart();
      fetchCart();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <h1 className="text-5xl flex items-center justify-center">
        <ShoppingBagIcon size={45} /> My Cart
      </h1>

      <button
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded w-fit self-center hover:bg-blue-700 transition"
        onClick={handleAddCart}
      >
        <PlusCircle size={20} /> Add Cart
      </button>

      <div className=" grid  grid-cols-1 gap-4">
        {carts ? (
          carts.length === 0 ? (
            <p className="text-gray-500 mt-2">No carts found.</p>
          ) : (
            carts.map((cart) => (
              <div key={cart.id} className="bg-white rounded shadow p-4">
                <h2 className="bg-blue-400 text-white flex items-center justify-center px-2 py-1 rounded">
                  Cart #{cart.id}
                </h2>
                <div className="bg-red-100 my-2">
                  {!cart.cartItems || cart.cartItems.length === 0 ? (
                    <p className="text-gray-500 mt-2">No items in this cart.</p>
                  ) : (
                    <div>
                      {cart.cartItems.map((item: CartItem) => (
                        <div key={item.id} className="text-black flex gap-1">
                         
                          <div className="flex flex-col">
                            <h3>{item.productName}</h3>
                            <h3>Product ID: {item.productId}</h3>
                            <h3>Quantity: {item.quantity}</h3>
                            <h3>Price per: {item.price}</h3>
                          </div>
                          <div>
                            <h1>Total: {item.price * item.quantity}</h1>
                            <button className="bg-blue-500 text-white">order</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="mt-2 font-bold text-black">
                  Total Price: ${cart.totalPrice}
                </div>
              </div>
            ))
          )
        ) : (
          <p className="text-gray-500 mt-2">Loading cart...</p>
        )}
      </div>
    </div>
  );
};

export default CartPage;