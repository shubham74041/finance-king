import React, { useEffect, useState } from "react";
import axios from "axios";
import "./WithdrawData.css";

const WithdrawData = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("site");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://rajjiowin-backend.vercel.app/withdraw-data/${userId}`
        );

        const fetchedData = response.data;

        // Load disabled state from local storage
        const disabledStates =
          JSON.parse(localStorage.getItem("disabledStates")) || {};

        // Map the disabled state to the fetched data
        const updatedData = fetchedData.map((item) => ({
          ...item,
          disabled: disabledStates[item._id] || false,
        }));

        setData(updatedData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleAction = async (id, action) => {
    try {
      const response = await axios.post(
        `https://rajjiowin-backend.vercel.app/withdraw-data/${id}`,
        {
          action,
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to update data");
      }

      // Show success alert
      alert(`Action ${action ? "Pay" : "Cancel"} successful!`);

      // Update the disabled state in local storage
      const disabledStates =
        JSON.parse(localStorage.getItem("disabledStates")) || {};
      disabledStates[id] = true;
      localStorage.setItem("disabledStates", JSON.stringify(disabledStates));

      // Update the state
      setData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, action, disabled: true } : item
        )
      );
    } catch (error) {
      setError(error);
      // Show error alert
      alert("Failed to update data");
    }
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
                <th className="th">Action</th>
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
                    <td className="td" data-label="Action">
                      <button
                        className="action_button pay_button"
                        onClick={() => handleAction(item._id, true)}
                        disabled={item.disabled}
                      >
                        Pay
                      </button>
                      <button
                        className="action_button cancel_button"
                        onClick={() => handleAction(item._id, false)}
                        disabled={item.disabled}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                  <tr className="separator">
                    <td colSpan="9">
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
