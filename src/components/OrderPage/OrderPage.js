import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderPage.css";

const OrderPage = () => {
  const id = localStorage.getItem("site");
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `https://rajjiowin-backend.vercel.app/order/${id}`
        );
        setOrderData(response.data);
      } catch (error) {
        console.error("Error fetching order data:", error);
        alert("Error fetching order data. Please try again later.");
      }
    };

    if (id) {
      fetchOrderData();
    }
  }, [id]);

  return (
    <div className="order-page">
      <h4>Order Details</h4>

      {orderData.length > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Plan Name</th>
              <th>Price</th>
              <th>Daily Income</th>
              <th>Total Income</th>
              <th>Cycle</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orderData.map((product) => (
              <tr key={product._id}>
                <td data-label="User">{product.userId}</td>
                <td data-label="Plan Name">{product.productTitle}</td>
                <td data-label="Price">&#8377; {product.productPrice}</td>
                <td data-label="Daily Income">
                  &#8377; {product.productDailyIncome}
                </td>
                <td data-label="Total Income">
                  &#8377; {product.productTotalAmount}
                </td>
                <td data-label="Cycle">{product.productCycle}</td>
                <td data-label="Date">
                  {new Date(product.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No order details found.</p>
      )}
    </div>
  );
};

export default OrderPage;
