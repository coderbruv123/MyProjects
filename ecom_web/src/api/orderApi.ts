import axios from './axiosInstancs';
import type { addOrder, Order } from '../types/Order';

interface orderuuidResponse {
  transactionUuid: string;
}

export const getOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get<Order[]>('/Order');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const addOrders = async (Order: addOrder): Promise<Order | null> => {
  try {
    const response = await axios.post<Order>('/Order', Order);
    return response.data;
  } catch (error) {
    console.error('Error adding order:', error);
    return null;
  }
};

export const createtransactionuuid = async (orderId: number): Promise<string> => {
  try {
    const response = await axios.post<orderuuidResponse>(`/Order/updateTransactionUuid/${orderId}`);
    return response.data.transactionUuid; // return only the UUID string
  } catch (error) {
    console.error('Error creating transaction UUID:', error);
    throw error;
  }
};
