 export interface EsewaPaymentProps {
  amount: number;
  productId: string;
  successUrl: string;
  failureUrl: string;
  transactionuuid: string;
}