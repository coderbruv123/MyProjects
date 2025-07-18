import React from 'react';
import { initiateKhaltiPay } from '../../api/paymentApi';

const KhaltiPay = () => {
  const handlePay = async () => {
    try {
      const orderId = "ORDER123";
      const orderName = "Test Product";
      const amount = 10; 

      const { payment_url } = await initiateKhaltiPay(amount, orderId, orderName);

      window.location.href = payment_url; 
    } catch (error) {
      console.error("❌ Error initiating Khalti payment:", error);
    }
  };

  return (
    <div className="p-6 text-center">
      <button
        onClick={handlePay}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
      >
        Khalti 
      </button>
    </div>
  );
};

export default KhaltiPay;
