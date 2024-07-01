import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Header/Header";
import HomeCard from "../HomeCard/HomeCard";
import CheckIn from "../CheckIn/CheckIn";
import CustomAlert from "../AdminPage/Admin/CustomAlert";
import Img1 from "../icons/img1.jpg";
import Img2 from "../icons/img2.jpg";
import Img3 from "../icons/img3.jpg";
import Img4 from "../icons/img4.jpg";
import Img5 from "../icons/img5.jpg";
import Img6 from "../icons/img6.jpg";
import "./HomePage.css";

const HomePage = ({ cards }) => {
  const [walletBalance, setWalletBalance] = useState("");
  const [purchasedPlans, setPurchasedPlans] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [fetchedCards, setFetchedCards] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("site");
    axios
      .get(`https://rajjiowin-backend.vercel.app/${userId}/purchasedPlans`)
      .then((response) => {
        setPurchasedPlans(
          response.data.purchasedPlans.map((plan) => plan.productTitle)
        );
        setFetchedCards(response.data.cards);
        setWalletBalance(response.data.walletBalance); // Set initial wallet balance
      })
      .catch((error) => {
        console.error("Error fetching purchased plans:", error);
      });
  }, []);

  const handleBuy = (card) => {
    if (card.title === "Plan A" && purchasedPlans.includes(card.title)) {
      setAlertMessage("You have already purchased Plan A.");
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
          setWalletBalance(response.data.walletBalance); // Update wallet balance
          window.location.reload();
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
      <Navbar />
      <HomeCard balance={walletBalance} />
      <CheckIn setWalletBalance={setWalletBalance} />
      <div className="card-container">
        {fetchedCards.map((card) => (
          <div key={card.id} className="dummy-card">
            <div className="img-container">
              <div className="title">
                <b>{card.title}</b>
              </div>
              <div className="img">
                <img
                  src={getImageForCard(card.title)}
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
              <button onClick={() => handleBuy(card)} className="buy-button">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
      {showAlert && (
        <CustomAlert message={alertMessage} onClose={handleCloseAlert} />
      )}
    </div>
  );
};

// Function to get image based on card title
function getImageForCard(title) {
  switch (title) {
    case "Plan A":
      return Img2;
    case "Plan B":
      return Img5;
    case "Plan C":
      return Img3;
    case "Plan D":
      return Img4;
    case "Plan E":
      return Img1;
    case "Plan F":
      return Img6;
    default:
      return Img1; // Default image if title doesn't match
  }
}

export default HomePage;
