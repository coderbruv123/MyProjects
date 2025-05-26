import axios from './axiosInstancs';
import type { Product, ProductFormData } from '../types/Product';


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

export const createProduct = async (product: ProductFormData): Promise<Product> => {
        const formData = new FormData();
    formData.append('name',product.name);
 formData.append('name', product.name);
    formData.append('price', product.price.toString());
    formData.append('categoryId',product.categoryId.toString());
    formData.append('quantity',product.quantity.toString());
    if(product.image && product.image instanceof File ){
        formData.append('image',product.image);

    }
    const res = await axios.post<Product>('/Product', formData, {
        headers:{
            'Content-Type':'multipart/form-data',
        }
    });
    return res.data;
};

export const updateProduct = async (product: Product): Promise<Product> => {
    const res = await axios.put<Product>(`/Product/${product.id}`, product);
    return res.data;
}; 