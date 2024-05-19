import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const RechargeDataPage = () => {
  const [rechargeData, setRechargeData] = useState([]);
  const [paid, setPaid] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState({}); // State for tracking disabled buttons

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rajjiowin-backend.vercel.app/recharge-data"
        ); // Adjust URL as per your backend endpoint
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
      setDisabledButtons((prevState) => ({ ...prevState, [id]: true })); // Disable the button when clicked
      console.log(id);
      // Make the POST request to update the data
      await axios.post(
        `https://rajjiowin-backend.vercel.app/recharge-data/${id}`,
        {
          userId: userId,
          rechargeAmount: rechargeAmount,
          paid: paid,
        }
      );
      window.location.reload(); // Reload the page after successful update
    } catch (error) {
      console.error("Error updating data:", error);
      setDisabledButtons((prevState) => ({ ...prevState, [id]: false })); // Re-enable the button in case of an error
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
                disabled={disabledButtons[item._id] || item.paid} // Disable if button state is true or already paid
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
                disabled={disabledButtons[item._id] || item.paid} // Disable if button state is true or already not paid
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
