import axios from "./axiosInstancs";
import type { Cart, CartItem } from "../types/Cart";

export const getCart = async (): Promise<Cart[] | null> => {
  try {
    const response = await axios.get<Cart[]>(`/cart/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};

export const addCart = async (): Promise<Cart | null> => {
  try {
    const response = await axios.post<Cart>(`/cart/cart/add`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding cart:", error);
    return null;
  }
};

export const addCartItems = async (
  id: number,
  item: CartItem
): Promise<CartItem | undefined> => {
  try {
    const res = await axios.post<CartItem>(`/cart/cart/item/${id}`, item);
   console.log("Cart item added:", res.data);
    return res.data;
  
  } catch (error) {
    console.error("Error adding cart item:", error);
    return undefined;
  }
};
export const deleteCartItem = async (
  cartId: number,
  productId: number
): Promise<void> => {
  try {
    await axios.delete(`/cart/${cartId}/${productId}`);
    console.log(`Cart item with product ID ${productId} deleted from cart ID ${cartId}`);
  } catch (error) {
    console.error("Error deleting cart item:", error);
  }
}
