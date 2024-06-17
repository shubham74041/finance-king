import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const RechargeDataPage = () => {
  const [rechargeData, setRechargeData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  // Initialize the disabledButtons state from local storage
  const initializeDisabledButtons = () => {
    const savedDisabledButtons = localStorage.getItem("disabledButtons");
    return savedDisabledButtons ? JSON.parse(savedDisabledButtons) : {};
  };

  const [disabledButtons, setDisabledButtons] = useState(
    initializeDisabledButtons
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://rajjiowin-backend.vercel.app/recharge-data"
        );
        setRechargeData(response.data);

        // Initialize the disabled buttons state based on the data
        const disabledState = {};
        response.data.forEach((item) => {
          if (disabledButtons[item._id] === undefined) {
            disabledState[item._id] = false;
          }
        });
        setDisabledButtons((prevState) => ({ ...prevState, ...disabledState }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePaid = async (id, userId, rechargeAmount, paid) => {
    try {
      // Immediately disable the buttons to give feedback to the user
      setDisabledButtons((prevState) => {
        const newState = { ...prevState, [id]: true };
        localStorage.setItem("disabledButtons", JSON.stringify(newState));
        return newState;
      });

      await axios.post(
        `https://rajjiowin-backend.vercel.app/recharge-data/${id}`,
        {
          userId: userId,
          rechargeAmount: rechargeAmount,
          paid: paid,
        }
      );

      // Update the paid status in the local state
      setRechargeData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, paid: paid } : item
        )
      );

      // Reload the page to persist the disabled state
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      // If there's an error, re-enable the buttons
      setDisabledButtons((prevState) => {
        const newState = { ...prevState, [id]: false };
        localStorage.setItem("disabledButtons", JSON.stringify(newState));
        return newState;
      });
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredData = rechargeData.filter((item) =>
    item.userId.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="recharge_container">
      <h2 className="recharge_heading">Recharge Data</h2>
      <input
        type="text"
        placeholder="Search by UserID"
        value={searchInput}
        onChange={handleSearchInputChange}
        className="search_input"
      />
      <div className="recharge-list">
        {filteredData.map((item, index) => (
          <div className="recharge-item" key={index}>
            <div>
              <p>UserId: {item.userId}</p>
              <p>Amount: {item.rechargeAmount}</p>
              <p>Paid: {item.paid.toString()}</p>
            </div>
            <div className="recharge_btn">
              <button
                className="btn"
                onClick={() =>
                  handlePaid(item._id, item.userId, item.rechargeAmount, true)
                }
                disabled={disabledButtons[item._id]}
              >
                Yes
              </button>
              <button
                className="btn"
                onClick={() =>
                  handlePaid(item._id, item.userId, item.rechargeAmount, false)
                }
                disabled={disabledButtons[item._id]}
              >
                No
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RechargeDataPage;
