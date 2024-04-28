// TotalAmountPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import "./TotalAmountPage.css";
import HomeCard from "../HomeCard/HomeCard";
import { FaAngleRight } from "react-icons/fa";
import withdrawalIcon from "../icons/withdrawalIcon.png";
// import Support from "../icons/support.svg";



const TotalAmountPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div className="total-amount-container">
      <HomeCard />
      <div className="additional-links">
        <div className="link" onClick={() => handleNavigate("/order")}>
          <img src={withdrawalIcon} alt="Withdrawal" className="" style={{ width: "30px", height: "30px" }} />
          <div className="common-space">

          <span>Order Record</span>
          <FaAngleRight />
          </div>
        </div>

        <div className="link" onClick={() => handleNavigate("/financial")}>
        <img src={withdrawalIcon} alt="Withdrawal" className="" style={{ width: "30px", height: "30px" }} />
        <div className="common-space">
          <span>Financial Details</span>
          <FaAngleRight />
        </div>
        </div>

        <div className="link" onClick={() => handleNavigate("/download")}>
          <img src={withdrawalIcon} alt="Withdrawal" className="" style={{width:"30px",height:"30px"}} />
          <span>Downloads</span>
          <FaAngleRight />
        </div>

        <div className="link" onClick={() => handleNavigate("/follow")}>
          <img src={withdrawalIcon} alt="Withdrawal" className="" style={{width:"30px",height:"30px"}} />
          <span>Follow us</span>
          <FaAngleRight />
        </div>

        <div className="link" onClick={() => handleNavigate("/support")}>
          <img src={withdrawalIcon} alt="Withdrawal" className="" style={{width:"30px",height:"30px"}} />
          <span>Support</span>
          <FaAngleRight />
        </div>

        <div className="link" onClick={() => handleNavigate("/complaint")}>
          <img src={withdrawalIcon} alt="Withdrawal" className="" style={{width:"30px",height:"30px"}} />
          <span>Complaint</span>
          <FaAngleRight />
        </div>

        <div className="link" onClick={() => handleNavigate("/logout")}>
          <img src={withdrawalIcon} alt="Withdrawal" className="" style={{width:"30px",height:"30px"}} />
          <span>Sign Out</span>
          <FaAngleRight />
        </div>
      </div>
    </div>
  );
};

export default TotalAmountPage;
