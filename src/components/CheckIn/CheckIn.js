// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./CheckIn.css";
// import CheckInIcon from "../icons/icons8-entrance-100.png";

// const CheckIn = ({ setWalletBalance }) => {
//   const [message, setMessage] = useState("");
//   const [buttonEnabled, setButtonEnabled] = useState(false);

//   const fetchCheckInStatus = async () => {
//     const userId = localStorage.getItem("site");
//     try {
//       const response = await axios.get(
//         `https://rajjiowin-backend.vercel.app/${userId}/check-in-status`
//       );
//       if (response.data.checkInStatus) {
//         setButtonEnabled(true);
//       } else {
//         setButtonEnabled(false);
//       }
//     } catch (error) {
//       console.error("Error fetching check-in status:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCheckInStatus();

//     // Polling mechanism to fetch check-in status every 10 seconds
//     const intervalId = setInterval(fetchCheckInStatus, 3000); // Adjust the interval as needed

//     // Cleanup interval on component unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleCheckIn = async () => {
//     const userId = localStorage.getItem("site");
//     try {
//       const response = await axios.post(
//         `https://rajjiowin-backend.vercel.app/check-in/${userId}`,
//         {}
//       );
//       const data = response.data;

//       if (data.message.includes("check-in complete")) {
//         setMessage("Checked in successfully!");
//         setWalletBalance(data.walletBalance);
//         setButtonEnabled(false); // Disable button after successful check-in
//         // Notify other tabs or devices about the update
//         localStorage.setItem("checkInUpdated", Date.now());
//         window.location.reload();
//       } else {
//         setMessage(data.message);
//       }
//     } catch (error) {
//       setMessage("Error during check-in. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const handleStorageChange = (event) => {
//       if (event.key === "checkInUpdated") {
//         fetchCheckInStatus();
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);

//     // Cleanup listener on component unmount
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   return (
//     <div className="checkIn-container">
//       <div className="check_title">
//         <button
//           onClick={handleCheckIn}
//           className={`check_in_button ${
//             buttonEnabled ? "default" : "disabled"
//           }`}
//           disabled={!buttonEnabled}
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
  const [message, setMessage] = useState("");
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [lastCheckInDate, setLastCheckInDate] = useState(null);

  const fetchCheckInStatus = async () => {
    const userId = localStorage.getItem("site");
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_PATH_URL}/check-in/${userId}`
      );
      const { checkInStatus, lastCheckIn } = response.data;
      console.log("Fetched check-in status:", checkInStatus, lastCheckIn);
      setButtonEnabled(checkInStatus);
      if (lastCheckIn) {
        const lastCheckInDate = new Date(lastCheckIn);
        console.log("Setting lastCheckInDate:", lastCheckInDate);
        setLastCheckInDate(lastCheckInDate);
      } else {
        console.log("lastCheckIn is null");
        setLastCheckInDate(null);
      }
    } catch (error) {
      console.error("Error fetching check-in status:", error);
    }
  };

  useEffect(() => {
    fetchCheckInStatus();

    // Polling mechanism to fetch check-in status every 3 seconds
    const intervalId = setInterval(fetchCheckInStatus, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleCheckIn = async () => {
    const userId = localStorage.getItem("site");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_PATH_URL}/check-in/${userId}`,
        {}
      );
      const data = response.data;
      console.log("Getting data:", data);
      if (data.message.includes("check-in complete")) {
        console.log("Check-in complete:", data);
        setMessage("Checked in successfully!");
        setWalletBalance(data.walletBalance);
        setButtonEnabled(false); // Disable button after successful check-in
        const now = new Date();
        console.log("Updating lastCheckInDate after check-in:", now);
        setLastCheckInDate(now); // Update the last check-in date
        localStorage.setItem("checkInUpdated", Date.now());
        window.location.reload();
      } else {
        setMessage(data.message);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during check-in:", error);
      setMessage("Error during check-in. Please try again.");
    }
  };

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "checkInUpdated") {
        console.log("Storage change detected, fetching check-in status");
        fetchCheckInStatus();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Cleanup listener on component unmount
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Enable button at the start of a new day
  useEffect(() => {
    const now = new Date();
    console.log("Checking if it's a new day:", now, lastCheckInDate);
    if (
      lastCheckInDate &&
      now.toDateString() !== lastCheckInDate.toDateString()
    ) {
      console.log("New day detected, enabling button");
      setButtonEnabled(true);
    }
  }, [lastCheckInDate]);

  return (
    <div className="checkIn-container">
      <div className="check_title">
        <button
          onClick={handleCheckIn}
          className={`check_in_button ${
            buttonEnabled ? "default" : "disabled"
          }`}
          disabled={!buttonEnabled}
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
