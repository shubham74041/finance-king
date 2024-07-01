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

const CheckIn = ({ setWalletBalance }) => {
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState("");
  const [buttonColor, setButtonColor] = useState("default");

  // Retrieve button color from localStorage on initial render
  useEffect(() => {
    const storedColor = localStorage.getItem("buttonColor");
    if (storedColor) {
      setButtonColor(storedColor);
    }
  }, []);

  useEffect(() => {
    const fetchCheckInStatus = async () => {
      const userId = localStorage.getItem("site");
      if (!userId) return;

      try {
        const response = await axios.get(
          `https://rajjiowin-backend.vercel.app/${userId}/check-in-status`
        );
        const { isEnabled } = response.data;

        setEnabled(isEnabled);
        const newButtonColor = isEnabled ? "default" : "checked-in";
        setButtonColor(newButtonColor);
        localStorage.setItem("buttonColor", newButtonColor);
      } catch (error) {
        console.error("Error fetching check-in status:", error);
      }
    };

    fetchCheckInStatus();
  }, []);

  const handleCheckIn = async () => {
    const userId = localStorage.getItem("site");
    try {
      const response = await axios.post(
        `https://rajjiowin-backend.vercel.app/check-in/${userId}`,
        {}
      );
      const data = response.data;

      if (data.message.includes("check-in complete")) {
        setMessage("Checked in successfully!");
        setWalletBalance(data.walletBalance);
        setEnabled(false); // Disable after check-in
        setButtonColor("checked-in");
        localStorage.setItem("buttonColor", "checked-in"); // Store button color in localStorage
      } else {
        setMessage(data.message);
      }

      // Close the popup after 5 seconds and reload the page
      setTimeout(() => {
        setMessage("");
        window.location.reload();
      }, 2000);
    } catch (error) {
      setMessage("Error during check-in. Please try again.");

      // Close the popup after 5 seconds and reload the page
      setTimeout(() => {
        setMessage("");
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <div className="checkIn-container">
      <div className="check_title">
        <button
          onClick={handleCheckIn}
          className={`check_in_button ${buttonColor}`}
          disabled={!enabled}
        >
          <span className="title_check">Check-in</span>
        </button>
        <span className="title_check2">Get rewards</span>
      </div>
      <div className="img_check">
        <img src={CheckInIcon} alt="checkIn-img" />
      </div>
      {message && <div className="popup">{message}</div>}
    </div>
  );
};

export default CheckIn;
