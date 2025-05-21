import { useEffect, useState } from "react";
import { ShoppingBagIcon, PlusCircle } from "lucide-react";
import { getCart } from "../../api/cartApi";
import type { Cart, CartItem } from "../../types/cart";

const Cart = () => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const fetchedCart = await getCart();
        setCart(fetchedCart);
      } catch (error) {
        setCart(null);
      }
    };

    fetchCart();
  }, []);

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <h1 className="text-5xl flex items-center justify-center">
        <ShoppingBagIcon size={45} /> My Cart
      </h1>

      <button
        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded w-fit self-center hover:bg-blue-700 transition"
      >
        <PlusCircle size={20} /> Add Cart
      </button>

      <div className="flex flex-col gap-4">
        {cart ? (
          <div className="bg-white rounded shadow p-4">
            <h2 className="bg-blue-400 text-white flex items-center justify-center px-2 py-1  rounded">
              Cart #{cart.id}
            </h2>
            <div className="bg-red-100 my-2">
              {cart.cartItems.length === 0 ? (
                <p className="text-gray-500 mt-2">No items in this cart.</p>
              ) : (
                <div>
                  {cart.cartItems.map((item: CartItem) => (
                    <div  key={item.id} className="text-black flex gap-1">
                      <img src="" className="h-25 w-25" alt={item.productName}/>
                      <div className="flex flex-col">
                      <h3 className="">{item.productName}</h3>
                      <h3 className="">Product ID: {item.productId} </h3>
                      
                      <h3 className="">Quantity:{item.quantity} </h3>
                      <h3  className=""> Price per :{item.price}</h3>
                      </div>
                      <div>
                      <h1>Total :{ item.price* item.quantity}</h1>
                      <button className="bg-blue-500 text-white">  order</button>
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
        ) : (
          <p className="text-gray-500 mt-2">Loading cart...</p>
        )}
      </div>
    </div>
  );
};

export default Cart;