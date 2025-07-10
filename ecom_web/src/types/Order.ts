export interface Order {
    id: number;
    userId: number;
    transactionUuid: string;
    orderItems: OrderItem[];
    orderDate: string;
    totalAmount: number;
    phoneNumber: string;
    location: string;
    status: string; 
}
export interface OrderItem{
    orderId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
}
export interface addOrder{
    id:number;
    totalAmount: number;
    phoneNumber: string;
    location: string;
    orderItems: OrderItem[];
    status: string;
}
