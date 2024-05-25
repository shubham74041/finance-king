import React, { useEffect, useState } from "react";
import "./WithdrawData.css";

const WithdrawData = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("site");
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://rajjiowin-backend.vercel.app/withdraw-data/${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredData = data.filter((item) =>
    item.userId.toLowerCase().includes(searchInput.toLowerCase())
  );

  if (error) {
    return <p className="error">Error: {error.message}</p>;
  }

  return (
    <div className="withdraw_container">
      <h2 className="withdraw_title">Withdraw Data</h2>
      <input
        type="text"
        placeholder="Search by UserID"
        value={searchInput}
        onChange={handleSearchInputChange}
        className="search_input"
      />
      {filteredData.length > 0 ? (
        <div className="withdraw_table_wrapper">
          <table className="table first-table">
            <thead>
              <tr>
                <th className="th">UserID</th>
                <th className="th">Amount</th>
                <th className="th">Date</th>
                <th className="th">Payment Method</th>
                <th className="th">UPI ID</th>
                <th className="th">Bank Name</th>
                <th className="th">Account Number</th>
                <th className="th">IFSC Code</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <React.Fragment key={item._id}>
                  <tr className="tr user-separator">
                    <td className="td" data-label="UserID">
                      {item.userId}
                    </td>
                    <td className="td" data-label="Amount">
                      {item.withdrawalAmount}
                    </td>
                    <td className="td" data-label="Date">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                    <td className="td" data-label="Payment Method">
                      {item.paymentMethod}
                    </td>
                    <td className="td" data-label="UPI ID">
                      {item.upiId}
                    </td>
                    <td className="td" data-label="Bank Name">
                      {item.bankName}
                    </td>
                    <td className="td" data-label="Account Number">
                      {item.accountNumber}
                    </td>
                    <td className="td" data-label="IFSC Code">
                      {item.IFSCCode}
                    </td>
                  </tr>
                  <tr className="separator">
                    <td colSpan="8">
                      <hr className="table-separator" />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data">No data available</p>
      )}
    </div>
  );
};

export default WithdrawData;
