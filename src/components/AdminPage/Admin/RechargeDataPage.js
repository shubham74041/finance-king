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
        const response = await axios.get(
          "https://rajjiowin-backend.vercel.app/recharge-data"
        );
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
      await axios.post(
        `https://rajjiowin-backend.vercel.app/recharge-data/${id}`,
        {
          userId: userId,
          rechargeAmount: rechargeAmount,
          paid: paid,
        }
      );
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
    <div className="container">
      <h2 className="heading">Recharge Data</h2>
      <input
        type="text"
        placeholder="Search by UserID"
        value={searchInput}
        onChange={handleSearchInputChange}
        className="search_input"
      />
      <ul className="list">
        {filteredData.map((item, index) => (
          <li className="list_item" key={index}>
            UserId: {item.userId}, Amount: {item.rechargeAmount}, Paid:{" "}
            {item.paid.toString()}
            <span>
              <button
                className="btn"
                onClick={() =>
                  handlePaid(item._id, item.userId, item.rechargeAmount, true)
                }
                disabled={disabledButtons[item._id] || item.paid}
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
                disabled={disabledButtons[item._id] || item.paid}
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
