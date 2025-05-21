export interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  price: number;
  productName:string;
  // Add other properties as needed
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