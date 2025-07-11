import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();

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
        const message = data.message || "Payment completed.";

        console.log("Transaction UUID:", transaction_uuid);
        console.log("Status:", status);
        console.log("Message:", message);
        if(status=="COMPLETED"){
          console.log("✅ Payment was successful!");
          
        }

      } catch (err) {
        console.error("❌ Error decoding or parsing payment data:", err);
      }
    } else {
      console.log("❌ No data param found in success URL");
    }
   
  }, [location]);

  return (
    <div className="p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Payment Successful 🎉</h1>
      <p>Your payment has been processed successfully.</p>
    </div>
  );
};

export default Success;
