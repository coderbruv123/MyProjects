import { useEffect, useState } from "react";
import { ShoppingBagIcon, PlusCircle } from "lucide-react";
import { getCart, addCart, deleteCartItem } from "../../api/cartApi";
import type { Cart, CartItem } from "../../types/Cart";
import { Link } from "react-router-dom";
import type { addOrder, Order } from "../../types/Order";
import { addOrders } from "../../api/orderApi";

const CartPage = () => {
  const [carts, setCarts] = useState<Cart[] | null>(null);
  
  const fetchCart = async () => {
    try {
      const fetchedCarts = await getCart();
      setCarts(fetchedCarts);
      console.log(fetchedCarts);
    } catch (error) {
      setCarts(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);
  const handleOrder = (item:CartItem) => {
    
    const order: addOrder ={
      id: 0,
            totalAmount: item.price * item.quantity,

      orderItems: [{
        orderId: 0, 
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      }],
      status: "Pending",

    }
    const response = addOrders(order);
    console.log("Order item:", response);
    

    
    alert("Order functionality is not implemented yet.");
  }
  const handleAddCart = async () => {
    try {
      await addCart();
      fetchCart();
    } catch (error) {
      alert(error);
    }
  };
  const handleRemoveCartItem = async (cartId: number, productId: number) => {
    try {
      await deleteCartItem(cartId, productId);
      fetchCart();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  }

 return (
  <div className="min-h-screen p-6 bg-gray-100">
    <h1 className="text-4xl font-bold text-center flex items-center justify-center gap-2 mb-6 text-blue-800">
      <ShoppingBagIcon size={40} /> My Cart
    </h1>
  <Link to="/Account/orders" className="text-blue-500">order</Link>
    <button
      className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-full mx-auto hover:bg-blue-700 transition shadow"
      onClick={handleAddCart}
    >
      <PlusCircle size={20} /> Add New Cart
    </button>

    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
      {carts ? (
        carts.length === 0 ? (
          <p className="text-gray-500 text-center col-span-full">No carts found.</p>
        ) : (
          carts.map((cart) => (
            <div
              key={cart.id}
              className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold text-white bg-blue-500 px-3 py-1 inline-block rounded mb-4">
                Cart #{cart.id}
              </h2>

              <div className="space-y-3">
                {!cart.cartItems || cart.cartItems.length === 0 ? (
                  <p className="text-gray-500">No items in this cart.</p>
                ) : (
                  cart.cartItems.map((item: CartItem) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-blue-100 p-3 rounded"
                    >
                      <img
                        className="h-16 w-16 object-cover rounded bg-white border"
                        src={`https://localhost:7032/${item.imageUrl}` || "/placeholder.png"}
                        alt={item.productName}
                      />2

                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{item.productName}</h3>
                        <p className="text-sm text-gray-600">
                          Rs {item.price} × {item.quantity}
                        </p>
                        <p className="font-semibold text-gray-700">
                          Total: Rs {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <button onClick={()=>{handleRemoveCartItem(cart.id, item.productId )}} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm">
                        Remove</button>
                      <button onClick={()=>handleOrder(item)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm">
                        Order
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-4 font-bold text-right text-blue-700">
                Cart Total: Rs {cart.totalPrice.toFixed(2)}
              </div>
            </div>
          ))
        )
      ) : (
        <p className="text-gray-500 text-center col-span-full">Loading cart...</p>
      )}
    </div>
  </div>
);

};

export default CartPage;