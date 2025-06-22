export interface Order {
    id: number;
    userId: number;
    orderItems: OrderItem[];
    orderDate: string;
    totalAmount: number;
    status: string; 
}
export interface OrderItem{
    orderId: number;
    productId: number;
    prodectName: string;
    quantity: number;
    price: number;
}
export interface addOrder{
    id:number;
    totalAmount: number;

    orderItems: OrderItem[];
    status: string;
}
