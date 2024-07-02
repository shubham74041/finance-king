// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./CheckIn.css";
// import CheckInIcon from "../icons/icons8-entrance-100.png";

// const CheckIn = ({ enabled, setEnabled, setWalletBalance }) => {
//   const [message, setMessage] = useState("");
//   const [buttonColor, setButtonColor] = useState("default");

//   useEffect(() => {
//     const userId = localStorage.getItem("site");
//     const lastCheckInDate = localStorage.getItem(`lastCheckInDate_${userId}`);
//     const allowSecondCheckIn = localStorage.getItem(`allowSecondCheckIn`);
//     const today = new Date().toISOString().split("T")[0];

//     if (userId && lastCheckInDate === today && !allowSecondCheckIn) {
//       setEnabled(false);
//       setButtonColor("checked-in");
//     } else {
//       setEnabled(true);
//       setButtonColor("default");
//     }
//   }, [setEnabled]);

//   const handleCheckIn = async () => {
//     const userId = localStorage.getItem("site");
//     try {
//       const response = await axios.post(
//         `http://localhost:8080/check-in/${userId}`,
//         {}
//       );
//       const data = response.data;

//       if (data.message.includes("check-in complete")) {
//         setMessage("Checked in successfully!");
//         setButtonColor("checked-in");
//         setEnabled(false);
//         setWalletBalance(data.walletBalance);

//         const today = new Date().toISOString().split("T")[0];
//         localStorage.setItem(`lastCheckInDate_${userId}`, today);
//         localStorage.removeItem(`allowSecondCheckIn`);

//         // Reload the page after successful check-in
//         window.location.reload();
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       setMessage("Error during check-in. Please try again.");
//     }
//   };

//   return (
//     <div className="checkIn-container">
//       <div className="check_title">
//         <button
//           onClick={handleCheckIn}
//           className={`check_in_button ${buttonColor}`}
//           disabled={!enabled}
//         >
//           <span className="title_check">Check-in</span>
//         </button>
//         <span className="title_check2">Get rewards</span>
//       </div>
//       <div className="img_check">
//         <img src={CheckInIcon} alt="checkIn-img" />
//       </div>
//       {message && <div className="popup">{message}</div>}
//     </div>
//   );
// };

// export default CheckIn;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CheckIn.css";
import CheckInIcon from "../icons/icons8-entrance-100.png";
import CustomAlert from "../AdminPage/Admin/CustomAlert";

const CheckIn = ({ setWalletBalance, enabled }) => {
  const [buttonColor, setButtonColor] = useState(
    enabled ? "default" : "checked-in"
  );
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setButtonColor(enabled ? "default" : "checked-in");
  }, [enabled]);

  const handleCheckIn = async () => {
    const userId = localStorage.getItem("site");
    try {
      const response = await axios.post(
        `https://rajjiowin-backend.vercel.app/check-in/${userId}`,
        {}
      );
      const data = response.data;

      if (data.message.includes("check-in complete")) {
        setWalletBalance(data.walletBalance);
        setButtonColor("checked-in");
        setAlertMessage("Checked in successfully!");
        setShowAlert(true);
      } else {
        setAlertMessage(data.message);
        setShowAlert(true);
      }

      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.error("Error during check-in:", error);
      setAlertMessage("Error during check-in. Please try again.");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
      }, 2000);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="checkIn-container">
      <div className="check_title">
        <button
          onClick={handleCheckIn}
          className={`check_in_button ${buttonColor}`}
          disabled={!enabled}
          style={{ cursor: !enabled ? "not-allowed" : "pointer" }}
        >
          <span className="title_check">Check-in</span>
        </button>
        <span className="title_check2">Get rewards</span>
      </div>
      <div className="img_check">
        <img src={CheckInIcon} alt="checkIn-img" />
      </div>
      {showAlert && (
        <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

export default CheckIn;
