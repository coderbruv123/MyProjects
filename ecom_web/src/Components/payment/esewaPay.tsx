import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid";  // import uuidv4
import { getEsewaSign } from "../../api/paymentApi";

interface EsewaPayProps {
  amount: number;
  successUrl: string;
  failureUrl: string;
  transactionuuid: string
}

const EsewaPay: React.FC<EsewaPayProps> = ({ amount,transactionuuid, successUrl, failureUrl }) => {
  const [signature, setSignature] = useState("");
  const [transactionUuid,setuuid] = useState("");

  const tax_amount = 0;
  const total_amount = amount + tax_amount;
  const product_code = "EPAYTEST";  
  const product_service_charge = 0;
  const product_delivery_charge = 0;
  const signed_field_names = "total_amount,transaction_uuid,product_code";
  // const successurl = "http://localhost:5173/Payment/success";
  // const failure_url = "http://localhost:5173/Payment/failure  ";

  useEffect(() => {

    setuuid(transactionuuid);
    const fetchSignature = async () => {
      try {
        const res = await getEsewaSign(total_amount, transactionUuid, product_code);
        if (!res) {
          throw new Error("Failed to fetch eSewa signature");
        }
        setSignature(res);
      } catch (error) {
        console.error("Error fetching eSewa signature:", error);
      }
    };

    fetchSignature();
  }, [total_amount, transactionUuid]);

  if (!signature) {
    return <div>Generating payment signature...</div>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    e.currentTarget.submit();
  };

  return (
    <div>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="amount" value={amount} />
        <input type="hidden" name="tax_amount" value={tax_amount} />
        <input type="hidden" name="total_amount" value={total_amount} />
        <input type="hidden" name="transaction_uuid" value={transactionUuid} />
        <input type="hidden" name="product_code" value={product_code} />
        <input type="hidden" name="product_service_charge" value={product_service_charge} />
        <input type="hidden" name="product_delivery_charge" value={product_delivery_charge} />
        <input type="hidden" name="success_url" value={successUrl} />
        <input type="hidden" name="failure_url" value={failureUrl} />
        <input type="hidden" name="signed_field_names" value={signed_field_names} />
        <input type="hidden" name="signature" value={signature} />

        <button className=" bg-green-600 my-3 p-1" type="submit">Pay with eSewa</button>
      </form>
    </div>
  );
};

export default EsewaPay;
