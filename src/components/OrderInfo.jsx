import OrderCard from "./OrderCard";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";

const OrderInfo = () => {
  const { userId } = useParams();
  const [orderData, setOrderData] = useState([]);
  const [userData, setUserData] = useState({});
  const [total, setTotal] = useState(0);
  const [orderId, setOrderId] = useState(""); // State for order ID

  const fetchOrderData = async () => {
    try {
      const response = await fetch(
        `https://ecommerce-api-62pq.onrender.com/api/orders/user/${userId}`
      );
      const result = await response.json();
      console.log("API result:", result);

      // Ensure you're accessing the right structure
      if (result && result[0] && result[0].products) {
        setOrderId(result[0]._id);
        setOrderData(result[0].products); // Access the products array
        setUserData(result[0].user); // Access user information
        setTotal(result[0].total); // Access total amount
        console.log("products", result[0].products);
        console.log("user", result[0].user);
        console.log("total", result[0].total);
        console.log("order_id", result._id);
      } else {
        console.error("Unexpected data structure:", result);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchOrderData();
  }, []);

  return (
    <div className="pb-40 pt-16 bg-white">
      {/* Display User Info */}
      <div className="mb-8 mx-24 text-left">
        <h2 className="text-2xl font-bold">{userData.name}</h2>
        <p>{userData.address}</p>
        <p>{userData.email}</p>
      </div>

      {/* Display Heading with Underline Effect */}
      <h3 className="mx-24 relative text-2xl font-bold after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-1/2 after:h-1 after:bg-custom-blue after:transition-all after:duration-300 hover:after:w-full">
        Orders
      </h3>

      <div className="mb-8 mx-24 text-left">
        <h3 className=" text-lg mt-10 text-custom-blue ">
          Order ID: {orderId}
        </h3>
      </div>

      {/* Display Product Cards */}

      <div className="flex justify-center items-center mt-24">
        <div className="grid grid-cols-4 gap-8">
          {orderData.length > 0 ? (
            orderData.map((orderItem) => (
              <OrderCard key={orderItem._id} order={orderItem.productId} />
            ))
          ) : (
            <p className="bg-custom-blue text-white border-spacing-7 w-64 mx-10 p-1">
              Orders Not Found
            </p>
          )}
        </div>
      </div>

      <div className="text-right mt-9 p-5"></div>

      {/* Display User Info */}
      <div className="mb-8 mx-16 text-end px-32">
        <h3 className="text-balance font-bold">Total:{total}</h3>
      </div>
    </div>
  );
};

export default OrderInfo;
