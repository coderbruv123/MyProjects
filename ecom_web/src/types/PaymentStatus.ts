export interface PaymentStatus
  {
    transactionUuid: string;
    transaction_code: string;
    status: string;
    totalAmount: number;
    productCode: string;
}