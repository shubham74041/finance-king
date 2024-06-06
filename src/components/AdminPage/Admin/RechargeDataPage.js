import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const RechargeDataPage = () => {
  const [rechargeData, setRechargeData] = useState([]);
  const [paid, setPaid] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState({});
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/recharge-data");
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
      setDisabledButtons((prevState) => ({ ...prevState, [id]: true }));
      console.log(id);
      await axios.post(`http://localhost:8080/recharge-data/${id}`, {
        userId: userId,
        rechargeAmount: rechargeAmount,
        paid: paid,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error updating data:", error);
      setDisabledButtons((prevState) => ({ ...prevState, [id]: false }));
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
              <p> UserId: {item.userId}</p>
              <p>Amount: {item.rechargeAmount}</p>
              <p>Paid: {item.paid.toString()}</p>
              {/* UserId: {item.userId}, Amount: {item.rechargeAmount}, Paid:{" "}
              {item.paid.toString()} */}
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
