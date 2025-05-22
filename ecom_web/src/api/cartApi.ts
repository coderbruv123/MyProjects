import axios from "./axiosInstancs";
import type {  Cart} from '../types/Cart'

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

