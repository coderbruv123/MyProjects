export interface Product {
    id: number;
    name: string;
    price: number;
    quantity: number;
    categoryId: number;
    imagePath: string;
}
export interface ProductFormData {
 
  name: string;
  price: number;
   quantity: number;
    categoryId: number;
  image?: File; 
}

