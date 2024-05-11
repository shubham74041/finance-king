// RechargeDataPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const RechargeDataPage = () => {
  const [rechargeData, setRechargeData] = useState([]);
  const [paid, setPaid] = useState();
  const [buttonDisabled, setButtonDisabled] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/recharge-data"); // Adjust URL as per your backend endpoint
        console.log(response.data);
        setRechargeData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [paid]);

  const handlePaid = async (id, userId, rechargeAmount, paid) => {
    try {
      setPaid(paid);
      setButtonDisabled(true); // Disable the buttons when clicked
      console.log(id);
      // Make the POST request to update the data
      await axios.post(`http://localhost:8080/recharge-data/${id}`, {
        userId: userId,
        rechargeAmount: rechargeAmount,
        paid: paid,
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <div className="container">
      <h2 className="heading">Recharge Data</h2>
      <ul className="list">
        {rechargeData.map((item, index) => (
          <li className="list_item" key={index}>
            UserId: {item.userId} , Amount: {item.rechargeAmount}, Paid:
            {item.paid.toString()}
            <span>
              <button
                className="btn"
                onClick={() =>
                  handlePaid(item._id, item.userId, item.rechargeAmount, true)
                }
                disabled={item.paid === paid || buttonDisabled} // Disable if already paid or buttons disabled
              >
                Yes
              </button>
            </span>
            <span>
              <button
                className="btn"
                onClick={() =>
                  handlePaid(item._id, item.userId, item.rechargeAmount, false)
                }
                disabled={item.paid === paid || buttonDisabled}
              >
                No
              </button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RechargeDataPage;
