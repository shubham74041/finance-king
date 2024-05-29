import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FinancialPage.css";

const FinancialPage = () => {
  const [financialData, setFinancialData] = useState([]);
  const id = localStorage.getItem("site");

  useEffect(() => {
    if (id) {
      axios
        .get(`https://rajjiowin-backend.vercel.app/financial/${id}`)
        .then((response) => {
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

  return (
    <div>
      <h3>Financial Details</h3>
      {financialData.length > 0 ? (
        financialData.map((transaction, index) => (
          <div key={index} className="transaction">
            <p>
              User {transaction.userId} wallet recharge for Rs{" "}
              {transaction.rechargeAmount} is{" "}
              {transaction.paid ? "done" : "pending"}
            </p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FinancialPage;
