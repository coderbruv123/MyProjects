import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import type { PaymentStatus } from '../../types/PaymentStatus';
import { verifyEsewaPay } from '../../api/paymentApi';

const Success = () => {
  const location = useLocation();
  const [OrderStatus, setOrderStatus] = useState<PaymentStatus | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const dataParam = params.get('data');

    console.log("🔵 FULL SUCCESS URL:", location.pathname + location.search);

    if (dataParam) {
      try {
        const decoded = atob(dataParam);
        const data = JSON.parse(decoded);

        console.log("✅ Decoded Payment Data:", data);

        const transaction_uuid = data.transaction_uuid;
        const status = data.status;
        const transaction_code = data.transaction_code;
        const total_amount = data.total_amount;
        const product_code = data.product_code || "N/A";

        setOrderStatus({
          transactionUuid: transaction_uuid,
          transaction_code: transaction_code,
          status: status,
          totalAmount: total_amount,
          productCode: product_code
        });

        console.log("✅ Stored order status in state");

      } catch (err) {
        console.error("❌ Error decoding or parsing payment data:", err);
      }
    } else {
      console.log("❌ No data param found in success URL");
    }
  }, [location]);

  useEffect(() => {
    if (OrderStatus) {
      verifyEsewaPay(OrderStatus)
        .then(() => {
          console.log("✅ Payment verified successfully");
        })
        .catch((err) => {
          console.error("❌ Error verifying payment:", err);
        });

      console.log("🔄 OrderStatus updated:", OrderStatus);
    }
  }, [OrderStatus]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Successful 🎉</h1>
      <p>Your payment has been processed successfully.</p>

      {OrderStatus && (
        <div className="mt-4 text-left max-w-md mx-auto bg-gray-100 p-4 rounded">
          <h2 className="text-xl font-semibold mb-2">Payment Details:</h2>
          <pre className="text-sm">
            {JSON.stringify(OrderStatus, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default Success;
