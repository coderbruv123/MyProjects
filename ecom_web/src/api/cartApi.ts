import axios from "./axiosInstancs";
import type {  Cart, CartItem} from '../types/Cart'

export const getCart = async (): Promise<Cart[] | null> => {
  try {
    const response = await axios.get<Cart[]>(`/cart/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
};


export const addCart = async (): Promise<Cart |null>=>{
  try{

    const response = await axios.post<Cart>(`/Cart/cart/add`);
    console.log(response)
    return response.data;
  }
  catch(error){
    console.error("Error addingf cart:", error);
    return null;
  }
}

export const addCartItems = async (item:CartItem ): Promise< CartItem | undefined >=>{
  try{

    const res = await axios.post<CartItem>('/Cart/cart/item',item);
    return res.data;

  }
  catch (error){
    console.log("Error adding cart:" , error)
  }
}