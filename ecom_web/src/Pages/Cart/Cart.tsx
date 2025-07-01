import { useEffect, useState } from "react";
import { ShoppingBagIcon, PlusCircle } from "lucide-react";
import { getCart, addCart, deleteCartItem, clearCart } from "../../api/cartApi";
import type { Cart, CartItem } from "../../types/Cart";
import { Link } from "react-router-dom";
import type { addOrder } from "../../types/Order";
import { addOrders } from "../../api/orderApi";
import ProtectedRoute from "../../AuthCheck/AuthCheck";

// Define a new type extending CartItem with cartId
type SelectedCartItem = CartItem & { cartId: number };

const CartPage = () => {
  const [carts, setCarts] = useState<Cart[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState<SelectedCartItem | null>(null);
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const fetchCart = async () => {
    try {
      const fetchedCarts = await getCart();
      setCarts(fetchedCarts);
    } catch (error) {
      console.error("Failed to fetch cart:", error);
      setCarts(null);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddToOrderClick = (cartItem: CartItem, cartId: number) => {
    setSelectedCartItem({ ...cartItem, cartId }); // store cartId properly
    setShowModal(true);
  };

  const handleOrder = async (item: SelectedCartItem, phone: string, location: string) => {
    if (!phone || !location) {
      alert("Please enter phone number and location.");
      return;
    }

    try {
      const order: addOrder = {
        id: 0,
        totalAmount: item.price * item.quantity,
        orderItems: [
          {
            orderId: 0,
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            price: item.price,
          },
        ],
        status: "Pending",
        phoneNumber: phone,
        location: location,
      };
      console.log(order)
      const response = await addOrders(order);
      console.log("Order response:", response);

      await deleteCartItem(item.cartId, item.productId);
      await fetchCart();

      alert("Order placed successfully!");
      setShowModal(false);
      setPhone("");
      setLocation("");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order.");
    }
  };

  const handleClearCart = async (cartId: number) => {
    try {
      await clearCart(cartId);
      await fetchCart();
      alert("Cart cleared successfully!");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleAddCart = async () => {
    try {
      await addCart();
      await fetchCart();
    } catch (error) {
      console.error("Error adding cart:", error);
      alert("Failed to add cart.");
    }
  };

  const handleRemoveCartItem = async (cartId: number, productId: number) => {
    try {
      await deleteCartItem(cartId, productId);
      await fetchCart();
    } catch (error) {
      console.error("Error removing cart item:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-4xl font-bold text-center flex items-center justify-center gap-2 mb-6 text-blue-800">
        <ShoppingBagIcon size={40} /> My Cart
      </h1>

      <Link to="/Account/orders" className="text-blue-500 underline block text-center mb-4">
        View Orders
      </Link>

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
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold text-white bg-blue-500 px-3 py-1 inline-block rounded">
                    Cart #{cart.id}
                  </h2>
                  <button
                    className="text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleClearCart(cart.id)}
                  >
                    Clear
                  </button>
                </div>

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
                          src={
                            item.imageUrl
                              ? `https://localhost:7032/${item.imageUrl}`
                              : "/placeholder.png"
                          }
                          alt={item.productName}
                        />

                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{item.productName}</h3>
                          <p className="text-sm text-gray-600">
                            Rs {item.price} × {item.quantity}
                          </p>
                          <p className="font-semibold text-gray-700">
                            Total: Rs {(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => handleRemoveCartItem(cart.id, item.productId)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full text-sm"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => handleAddToOrderClick(item, cart.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-full text-sm"
                          >
                            Order
                          </button>
                        </div>
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

        {showModal && selectedCartItem && (
          <ProtectedRoute>
            <div
              className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 text-black"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowModal(false);
              }}
            >
              <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4">Place Order</h2>

                <div className="mb-4">
                  <label className="block mb-1 font-medium">Fill the Details</label>
                </div>

                <div>
                  <label>{selectedCartItem.productName}</label>
                </div>
                <div>
                  <label>
                    Rs {selectedCartItem.price} x {selectedCartItem.quantity} per unit = Rs{" "}
                    {selectedCartItem.quantity * selectedCartItem.price}
                  </label>
                </div>

                <form
                  className="space-y-4 mt-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleOrder(selectedCartItem, phone, location);
                  }}
                >
                  <div>
                    <label className="block mb-1 font-medium">Location</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Enter delivery address"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 font-medium">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border rounded"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                    >
                      Place Order
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </ProtectedRoute>
        )}
      </div>
    </div>
  );
};

export default CartPage;