import type { PaymentStatus } from "../types/PaymentStatus";
import axios from "./axiosInstancs";

interface EsewaSignatureResponse {
  signature: string;
}

export const getEsewaSign = async (
  amount: number,
  transactionUuid: string,
  productCode: string
): Promise<string> => {
  try {
    const response = await axios.get<EsewaSignatureResponse>('/Payment/generateEsewaSignature', {
      params: {
        totalAmount: amount, 
        transactionUuid,
        productCode
      }
    });
    return response.data.signature;
  } catch (error) {
    console.error('Error fetching Esewa signature:', error);
    throw error;
  }
};



export const verifyEsewaPay = async (
  paymentStatus: PaymentStatus
): Promise<PaymentStatus> => {
  try {
    const response = await axios.post<PaymentStatus>(
      '/Payment/verifyEsewaPayment',
      paymentStatus
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const initiateKhaltiPay = async (amount: number, orderId: string, orderName: string) => {
  const response = await axios.post('/Payment/initiateKhaltiPayment', {
    amount,
    orderId,
    orderName
  });
  return response.data; // returns { pidx, payment_url }
};

export const verifyKhaltiPay = async (pidx: string) => {
  const response = await axios.post('/Payment/verifyKhaltiPayment', { pidx });
  return response.data;
};
