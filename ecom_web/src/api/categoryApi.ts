import axios from "./axiosInstancs";
import type { Category } from "../types/Category";

export const getCategories = async (): Promise<Category[]> => {
    try {
        const response = await axios.get<Category[]>('/Category');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const addCategory = async (category:Category): Promise<Category | null> => {
    try{
        const response = await axios.post<Category>('/Category',category);
        return response.data;
    }
    catch (error) {
        console.error('Error adding category:', error);
        return null;
    }
}