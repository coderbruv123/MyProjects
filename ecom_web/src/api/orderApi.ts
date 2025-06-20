 import axios from './axiosInstancs';
import type { addOrder, Order } from '../types/Order';

 export const getOrders = async (): Promise<Order[]> => {
     try {
         const response = await axios.get<Order[]>('/Order');
         return response.data;
     } catch (error) {
         console.error('Error fetching orders:', error);
         throw error;
     }
 }

 export const addOrders = async (Order: addOrder): Promise<Order | null> => {
     try {
         const response = await axios.post<Order>('/Order', Order);
         return response.data;
     } catch (error) {
         console.error('Error adding order:', error);
         return null;
     }
 }