export interface CartItem {
  id: number
  imageUrl : string,
  productId: number;
  quantity: number;
  price: number;
  productName:string;
}

export interface User {
  id: number;
}

export interface Cart {
  id: number;
  userId: number;
  totalPrice: number;
  user: User | null;
  cartItems: CartItem[];
}