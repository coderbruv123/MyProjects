import axios from './axiosInstancs';
import type { Product } from '../types/Product';


export const getProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<Product[]>('/Product');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
}

export const getProductById = async(id:number): Promise<Product> => {
    const res = await axios.get<Product>(`/Product/${id}`);
    return res.data;
};

export const createProduct = async (product: Product): Promise<Product> => {
    const res = await axios.post<Product>('/Product', product);
    return res.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
    const res = await axios.put<Product>(`/Product/${product.id}`, product);
    return res.data;
}; 