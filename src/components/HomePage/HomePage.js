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
  const [checkInEnabled, setCheckInEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch check-in status from server and update localStorage
  useEffect(() => {
    const userId = localStorage.getItem("site");

    const initializeData = async () => {
      try {
        const response = await axios.get(
          `https://rajjiowin-backend.vercel.app/${userId}/purchasedPlans`
        );
        setPurchasedPlans(
          response.data.purchasedPlans.map((plan) => plan.productTitle)
        );
        setFetchedCards(response.data.cards);
        setWalletBalance(response.data.walletBalance);
        const checkInEnabledFromStorage = sessionStorage.getItem(
          `${userId}-checkInEnabled`
        );
        if (checkInEnabledFromStorage !== null) {
          setCheckInEnabled(checkInEnabledFromStorage === "true"); // Convert string to boolean
        } else {
          fetchCheckInStatus(userId); // Fetch from server if not found in sessionStorage
        }
      } catch (error) {
        console.error("Error fetching purchased plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const fetchCheckInStatus = (userId) => {
    axios
      .get(`https://rajjiowin-backend.vercel.app/${userId}/check-in-status`)
      .then((response) => {
        const isEnabled = response.data.isEnabled;
        sessionStorage.setItem(
          `${userId}-checkInEnabled`,
          isEnabled.toString()
        ); // Store as string in sessionStorage
        setCheckInEnabled(isEnabled);
        console.log("Check-in status from server:", isEnabled);
      })
      .catch((error) => {
        console.error("Error fetching check-in status:", error);
      });
  };

  // Function to handle purchase of a card
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
          setWalletBalance(response.data.walletBalance);
          // Update checkInEnabled based on server response after purchase
          sessionStorage.setItem(
            `${userId}-checkInEnabled`,
            response.data.checkInEnabled.toString()
          ); // Update sessionStorage
          setCheckInEnabled(response.data.checkInEnabled);
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

  // Function to handle closing the alert message
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  return (
    <div className="home">
      <Navbar />
      <HomeCard balance={walletBalance} />
      <CheckIn setWalletBalance={setWalletBalance} enabled={checkInEnabled} />
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
      return Img1;
  }
}

export default HomePage;
