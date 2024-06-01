import React, { useState } from "react";
import { connect } from "react-redux";
import GenericCard from "../GenericCard/GenericCard";
import "./HomePage.css";
import HomeCard from "../HomeCard/HomeCard";
import Img1 from "../icons/img1.jpg";
import Img2 from "../icons/img2.jpg";
import Img3 from "../icons/img3.jpg";
import Img4 from "../icons/img4.jpg";
import Img5 from "../icons/img5.jpg";
import Img6 from "../icons/img6.jpg";
import CheckIn from "../CheckIn/CheckIn";
import axios from "axios";

const HomePage = ({ cards }) => {
  const [walletBalance, setWalletBalance] = useState("");
  const [checkInEnabled, setCheckInEnabled] = useState(true); // State for enabling check-in

  const dummyCards = [
    {
      id: 1,
      title: "Plan A",
      price: 550,
      dailyIncome: 15.5,
      totalAmount: 1155,
      cycle: "75 days",
      image: Img2,
    },
    {
      id: 2,
      title: "Plan B",
      price: 1900,
      dailyIncome: 60,
      totalAmount: 3900,
      cycle: "65 days",
      image: Img5,
    },
    {
      id: 3,
      title: "Plan C",
      price: 4800,
      dailyIncome: 164,
      totalAmount: 9850,
      cycle: "60 days",
      image: Img3,
    },
    {
      id: 4,
      title: "Plan D",
      price: 14400,
      dailyIncome: 545,
      totalAmount: 30000,
      cycle: "55 days",
      image: Img4,
    },
    {
      id: 5,
      title: "Plan E",
      price: 38600,
      dailyIncome: 2150,
      totalAmount: 111800,
      cycle: "52 days",
      image: Img1,
    },
    {
      id: 6,
      title: "Plan F",
      price: 92800,
      dailyIncome: 6400,
      totalAmount: 320150,
      cycle: "50 days",
      image: Img6,
    },
  ];

  const handleBuy = (card) => {
    const userId = localStorage.getItem("site");
    const productPrice = parseFloat(card.price); // Ensure that price is parsed as a float
    console.log(userId);
    console.log("productPrice", productPrice);
    const cardData = {
      title: card.title,
      price: card.price,
      dailyIncome: card.dailyIncome,
      totalAmount: card.totalAmount,
      cycle: card.cycle,
    };

    // Make an API call to fetch wallet data based on userId
    axios
      .post(`https://rajjiowin-backend.vercel.app/${userId}`, {
        price: productPrice,
        cardData,
      }) // Send price instead of productPrice
      .then((response) => {
        console.log(response.data.msg);
        const responseMsg = response.data.msg;
        // const walletAmount = response.data.userTotalAmount;
        alert(responseMsg);
        setCheckInEnabled(true); // Enable check-in button
        window.location.reload(); // Reload the page to reflect changes
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error("Server responded with status:", error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error("No response received:", error.request);
        } else {
          // Something else happened while setting up the request
          console.error("Error:", error.message);
        }
        alert("Error fetching wallet data. Please try again later.");
      });
  };

  return (
    <div className="home">
      <HomeCard balance={walletBalance} />
      <CheckIn enabled={checkInEnabled} setEnabled={setCheckInEnabled} />
      <div className="card-container">
        {cards && cards.length > 0
          ? cards.map((card, index) => <GenericCard key={index} {...card} />)
          : null}
        {dummyCards.map((card) => (
          <div key={card.id} className="dummy-card">
            <div className="img-container">
              <div className="title">
                <span>
                  <b>{card.title}</b>
                </span>
              </div>
              <div className="img">
                <img
                  src={card.image}
                  alt={card.title}
                  className="responsive-image"
                />
              </div>
            </div>
            <div className="card-details">
              <div className="card-details1">
                <span>Price</span>
                <span>
                  <b>&#8377; {card.price}</b>
                </span>
              </div>
              <div className="card-details2">
                <span>Cycle</span>
                <span>
                  <b>{card.cycle}</b>
                </span>
              </div>
              <div className="card-details2">
                <span>Daily</span>
                <span>
                  <b>&#8377; {card.dailyIncome}</b>
                </span>
              </div>
              <div className="card-details2">
                <span>Total Income</span>
                <span>
                  <b>&#8377; {card.totalAmount}</b>
                </span>
              </div>
              <button onClick={() => handleBuy(card)} className="buy-button">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
};

export default connect(mapStateToProps)(HomePage);
