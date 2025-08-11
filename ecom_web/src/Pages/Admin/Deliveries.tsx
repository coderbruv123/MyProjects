import React, { useState, useEffect } from "react";

type DeliveryStatus = "delivering" | "pending";

interface DeliveryItem {
  id: number;
  name: string;
  status: DeliveryStatus;
  price?: number; 
  location?: string;
  estimatedDeliveryTime?: string; 
  trackingNumber?: string; 
  deliveryPerson?: string; 
  contactInfo?: string; 
  notes?: string;
}

const Deliveries: React.FC = () => {
  const [items, setItems] = useState<DeliveryItem[]>([]);

  useEffect(() => {
    const fetchData = () => {
      const mockData: DeliveryItem[] = [
        { id: 1, name: "Laptop", status: "delivering", price: 1200, location: "Warehouse A", estimatedDeliveryTime: "2 hours", trackingNumber: "123456", deliveryPerson: "John Doe", contactInfo: "555-1234", notes: "Handle with care" },
        { id: 2, name: "Phone", status: "pending" , price: 800, location: "Warehouse B", estimatedDeliveryTime: "3 hours", trackingNumber: "654321", deliveryPerson: "Jane Smith", contactInfo: "555-5678", notes: "Fragile" },
        { id: 3, name: "Headphones", status: "delivering", price: 200, location: "Warehouse C", estimatedDeliveryTime: "1 hour", trackingNumber: "789012", deliveryPerson: "Alice Johnson", contactInfo: "555-8765", notes: "Check battery" },
        { id: 4, name: "Shoes", status: "pending",  price: 100, location: "Warehouse D", estimatedDeliveryTime: "4 hours", trackingNumber: "210987", deliveryPerson: "Bob Brown", contactInfo: "555-4321", notes: "New model" },
      ];
      setItems(mockData);
    };
    fetchData();
  }, []);

  const deliveringItems = items.filter(item => item.status === "delivering");
  const pendingItems = items.filter(item => item.status === "pending");

  return (
    <div className="p-4 flex flex-col items-center " >
      <h1 className="flex items-center">📦 Delivery Status</h1>

      <section className="w-full max-w-2xl mt-4">
        <h2>🚚 Currently Delivering</h2>
        {deliveringItems.length > 0 ? (
          <div className="w-3/4">
            {deliveringItems.map(item => (
           
                <div className=" bg-white text-black flex items-center  justify-evenly   border-b border-gray-200 px-4 py-2" key={item.id}>
                                  <div className="flex-1 items-center justify-between  border-gray-200" >

                  {item.name} :
                  </div>
                                                    <div className=" flex-1 items-center justify-between  ">

                    <div className="text-gray-500  ">${item.price}</div> 
                   </div>
                   <div className="text-gray-500">
                     {item.location}
                    </div>
                  </div>
            ))}
          </div>
        ) : (
          <p>No items currently being delivered.</p>
        )}
      </section>

      <section  className="w-full max-w-2xl mt-4">
        <h2>⏳ Pending Delivery</h2>
        {pendingItems.length > 0 ? (
          <div className="w-full max-w-2xl mt-4">
            {pendingItems.map(item => (
                 <div className=" bg-white text-black flex items-center  justify-evenly   border-b border-gray-200 px-4 py-2" key={item.id}>
                                  <div className="flex-1 items-center justify-between  border-gray-200" >

                  {item.name} :
                  </div>
                                                    <div className=" flex-1 items-center justify-between  ">

                    <div className="text-gray-500  ">${item.price}</div> 
                   </div>
                   <div className="text-gray-500">
                     {item.location}
                    </div>
                  </div>
            ))}
          </div>
        ) : (
          <p>No pending deliveries.</p>
        )}
      </section>
    </div>
  );
};

export default Deliveries;
