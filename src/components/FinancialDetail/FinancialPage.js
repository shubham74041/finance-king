import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FinancialPage.css";
import Navbar from "../Header/Header";

const FinancialPage = () => {
  const [financialData, setFinancialData] = useState([]);
  const [filter, setFilter] = useState("Withdraw");
  const id = localStorage.getItem("site");

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_PATH_URL}/financial/${id}`)
        .then((response) => {
          console.log("API response:", response.data);
          setFinancialData(response.data);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the financial data!",
            error
          );
        });
    }
  }, [id]);

  const getStatus = (transaction) => {
    if (transaction.type === "recharge") {
      if (transaction.status === "false") {
        return "In processing";
      } else return transaction.paid ? "Recharged successfully" : "Cancelled";
    }

    if (transaction.type === "withdraw") {
      if (transaction.status === "false") {
        return "In processing";
      } else return transaction.paid ? "Withdraw successfully" : "Cancelled";
    }

    if (transaction.type === "other") {
      if (transaction.anotherType === "checkIn") {
        return transaction.checkIn ? "Check-in amount" : "Not Check-in";
      }
      if (transaction.amount === "" || transaction.amount === null) {
        return "No transactions available";
      }
      return transaction.paid ? "Referral reward" : "In processing";
    }

    return "Unknown status";
  };

  const filteredData = financialData
    .filter((transaction) => {
      if (filter.toLowerCase() === "other") {
        return (
          transaction.type.toLowerCase() === "other" ||
          (transaction.type.toLowerCase() === "other" &&
            transaction.anotherType?.toLowerCase() === "checkIn")
        );
      }
      return transaction.type.toLowerCase() === filter.toLowerCase();
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  console.log(filteredData);

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="financial-page">
      <Navbar />
      <h3>Transactions</h3>
      <div className="transaction-types">
        <button
          className={`transaction-type ${filter === "Other" ? "active" : ""}`}
          onClick={() => handleFilterChange("Other")}
        >
          Other
        </button>
        <button
          className={`transaction-type ${
            filter === "Recharge" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("Recharge")}
        >
          Recharge
        </button>
        <button
          className={`transaction-type ${
            filter === "Withdraw" ? "active" : ""
          }`}
          onClick={() => handleFilterChange("Withdraw")}
        >
          Withdraw
        </button>
      </div>
      <div className="transactions-list">
        {filteredData.length > 0 ? (
          filteredData.map((transaction, index) => (
            <div key={index} className="transaction">
              <p className="transaction-status">{getStatus(transaction)}</p>
              <p className="transaction-date">
                {new Date(transaction.date).toLocaleString()}
              </p>
              <p className="transaction-amount">{transaction.amount}</p>
            </div>
          ))
        ) : (
          <p>No transactions available</p>
        )}
      </div>
    </div>
  );
};

export default FinancialPage;
