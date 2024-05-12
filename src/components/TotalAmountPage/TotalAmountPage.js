// TotalAmountPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./TotalAmountPage.css";
import HomeCard from "../HomeCard/HomeCard";
// import { FaAngleRight } from "react-icons/fa";
import withdrawalIcon from "../icons/withdrawalIcon.png";
import recordIcon from "../icons/order-icon.png";
import financialIcon from "../icons/icons8-financial-100.png";
import followIcon from "../icons/icons8-telegram-100.png";
import supportIcon from "../icons/contact.png";
import complainIcon from "../icons/icons8-complaint-100.png";
import signoutIcon from "../icons/icons8-logout-100.png";
import { useAuth } from "../AuthProvider";
// import Support from "../icons/support.svg";

const TotalAmountPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="total-amount-container">
      <div>
        <HomeCard />
      </div>

      <div className="additional-links">
        <div className="link" onClick={() => handleNavigate("/order")}>
          <img
            src={recordIcon}
            alt="Withdrawal"
            className=""
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <div className="common-space">
            <span>Order Record</span>
            {/* <FaAngleRight /> */}
          </div>
        </div>

        <div className="link" onClick={() => handleNavigate("/financial")}>
          <img
            src={financialIcon}
            alt="Withdrawal"
            className=""
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <div className="common-space">
            <span>Financial Details</span>
            {/* <FaAngleRight /> */}
          </div>
        </div>
        {/* 
        <div className="link" onClick={() => handleNavigate("/download")}>
          <img
            src={withdrawalIcon}
            alt="Withdrawal"
            className=""
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <span>Downloads</span>
          <FaAngleRight />
        </div> */}

        <div className="link" onClick={() => handleNavigate("/follow")}>
          <img
            src={followIcon}
            alt="Withdrawal"
            className=""
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <span>Follow us</span>
          {/* <FaAngleRight /> */}
        </div>

        <div className="link" onClick={() => handleNavigate("/support")}>
          <img
            src={supportIcon}
            alt="Withdrawal"
            className=""
            style={{
              width: "30px",
              height: "30px",
              backgroundColor: "black",
              marginRight: "10px",
            }}
          />
          <span>Support</span>
          {/* <FaAngleRight /> */}
        </div>

        <div className="link" onClick={() => handleNavigate("/complaint")}>
          <img
            src={complainIcon}
            alt="Withdrawal"
            className=""
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <span>Complaint</span>
          {/* <FaAngleRight /> */}
        </div>

        <div className="link" onClick={() => handleNavigate("/logout")}>
          <img
            src={signoutIcon}
            alt="Withdrawal"
            className=""
            style={{ width: "30px", height: "30px", marginRight: "10px" }}
          />
          <span onClick={() => auth.logout()}>Sign Out</span>
          {/* <FaAngleRight /> */}
        </div>
      </div>
    </div>
  );
};

export default TotalAmountPage;
