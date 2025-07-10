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
