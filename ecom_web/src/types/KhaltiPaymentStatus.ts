export interface KhaltiPaymentStatus {
  pidx: string;
  txnId: string;
  amount: string;
  mobile: string | null;
  orderId: string | null;
  orderName: string | null;
  status: string;
}
