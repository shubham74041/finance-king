import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const RechargeDataPage = () => {
  const [rechargeData, setRechargeData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [disabledButtons, setDisabledButtons] = useState({});

  const initializeDisabledButtons = () => {
    const savedDisabledButtons = localStorage.getItem("disabledButtons");
    return savedDisabledButtons ? JSON.parse(savedDisabledButtons) : {};
  };

  // Function to fetch recharge data from the server
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://rajjiowin-backend.vercel.app/recharge-data"
      );
      const sortedData = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // Initialize disabledButtons based on backend data and localStorage
      const disabledState = {};
      sortedData.forEach((item) => {
        disabledState[item._id] = item.disabled; // Get disabled state from backend
      });

      setRechargeData(sortedData);
      setDisabledButtons(disabledState);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // Polling mechanism to fetch data every 10 seconds
    const intervalId = setInterval(fetchData, 2000); // Adjust the interval as needed

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle payment status update
  const handlePaid = async (id, userId, rechargeAmount, paid) => {
    try {
      if (disabledButtons[id]) {
        return; // Exit early if already disabled
      }

      // Immediately disable the button to give feedback to the user
      setDisabledButtons((prevDisabledButtons) => ({
        ...prevDisabledButtons,
        [id]: true,
      }));

      // Update backend with payment status
      await axios.post(`http://localhost:8080/recharge-data/${id}`, {
        userId,
        rechargeAmount,
        paid,
        disabled: true, // Set disabled to true
      });

      // Update local state (rechargeData and disabledButtons)
      setRechargeData((prevRechargeData) =>
        prevRechargeData.map((item) =>
          item._id === id ? { ...item, paid, disabled: true } : item
        )
      );

      // Update localStorage with disabledButtons state
      localStorage.setItem(
        "disabledButtons",
        JSON.stringify({ ...disabledButtons, [id]: true })
      );

      // Notify other tabs or devices about the update
      localStorage.setItem("rechargeDataUpdated", Date.now());
    } catch (error) {
      console.error("Error updating data:", error);
      // If there's an error, re-enable the button
      setDisabledButtons((prevDisabledButtons) => ({
        ...prevDisabledButtons,
        [id]: false,
      }));
    }
  };

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Filter data based on search input
  const filteredData = rechargeData.filter((item) =>
    item.userId.toLowerCase().includes(searchInput.toLowerCase())
  );

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "rechargeDataUpdated") {
        fetchData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
                disabled={disabledButtons[item._id] || item.paid}
              >
                Yes
              </button>
              <button
                className="btn"
                onClick={() =>
                  handlePaid(item._id, item.userId, item.rechargeAmount, false)
                }
                disabled={disabledButtons[item._id] || item.paid}
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
