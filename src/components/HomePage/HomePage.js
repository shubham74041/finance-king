import React, { useState, useEffect } from "react";
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
import CustomAlert from "../AdminPage/Admin/CustomAlert";

const HomePage = ({ cards }) => {
  const [walletBalance, setWalletBalance] = useState("");
  const [checkInEnabled, setCheckInEnabled] = useState(true);
  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

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

  useEffect(() => {
    const userId = localStorage.getItem("site");
    axios
      .get(`https://rajjiowin-backend.vercel.app/${userId}`)
      .then((response) => {
        setPurchasedPlans(
          response.data.purchasedPlans.map((plan) => plan.productTitle)
        );
      })
      .catch((error) => {
        console.error("Error fetching purchased plans:", error);
      });
  }, []);

  const handleBuy = (card) => {
    if (purchasedPlans.includes(card.title)) {
      setAlertMessage("You have already purchased this plan.");
      setShowAlert(true);
      return;
    }

    const userId = localStorage.getItem("site");
    const productPrice = parseFloat(card.price);
    const cardData = {
      title: card.title,
      price: card.price,
      dailyIncome: card.dailyIncome,
      totalAmount: card.totalAmount,
      cycle: card.cycle,
    };

    axios
      .post(`https://rajjiowin-backend.vercel.app/${userId}`, {
        price: productPrice,
        cardData,
      })
      .then((response) => {
        setAlertMessage(response.data.msg);
        setShowAlert(true);
        if (response.data.msg === "Product purchased successfully!") {
          setPurchasedPlans((prev) => [...prev, card.title]);
          setCheckInEnabled(true); // Enable check-in after successful purchase
          localStorage.setItem("allowSecondCheckIn", true);
          setWalletBalance(response.data.walletBalance); // Update wallet balance
          window.location.reload(); // Reload the page after successful purchase
        }
      })
      .catch((error) => {
        console.error("Error processing your purchase:", error);
        setAlertMessage(
          "Error processing your purchase. Please try again later."
        );
        setShowAlert(true);
      });
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <div className="home">
      <HomeCard balance={walletBalance} />
      <CheckIn
        enabled={checkInEnabled}
        setEnabled={setCheckInEnabled}
        setWalletBalance={setWalletBalance} // Pass setWalletBalance as a prop
      />
      <div className="card-container">
        {cards && cards.length > 0
          ? cards.map((card, index) => <GenericCard key={index} {...card} />)
          : null}
        {dummyCards.map((card) => (
          <div key={card.id} className="dummy-card">
            <div className="img-container">
              <div className="title">
                <b>{card.title}</b>
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
                <b>&#8377; {card.price}</b>
              </div>
              <div className="card-details2">
                <span>Cycle</span>
                <b>{card.cycle}</b>
              </div>
              <div className="card-details2">
                <span>Daily</span>
                <b>&#8377; {card.dailyIncome}</b>
              </div>
              <div className="card-details2">
                <span>Total Income</span>
                <b>&#8377; {card.totalAmount}</b>
              </div>
              <button
                onClick={() => handleBuy(card)}
                className="buy-button"
                disabled={purchasedPlans.includes(card.title)}
              >
                {purchasedPlans.includes(card.title) ? "Purchased" : "Buy"}
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Render CustomAlert component conditionally */}
      {showAlert && (
        <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cards: state.cards };
};

export default connect(mapStateToProps)(HomePage);
