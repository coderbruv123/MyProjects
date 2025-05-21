import axios from "./axiosInstancs";
import type {  Cart} from "../types/cart";


export const getCart = async (): Promise<Cart | null> => {
  try {
    const response = await axios.get<Cart>(`/cart/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};