import React from "react";
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

const HomePage = ({ cards }) => {
  const dummyCards = [
    {
      id: 1,
      title: "Plan A",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image: Img1,
    },
    {
      id: 2,
      title: "Plan B",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image: Img2,
    },
    {
      id: 3,
      title: "Plan C",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image: Img3,
    },
    {
      id: 4,
      title: "Plan D",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image: Img4,
    },
    {
      id: 5,
      title: "Plan E",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image: Img5,
    },
    {
      id: 6,
      title: "Plan F",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image: Img6,
    },
  ];

  return (
    <div className="home">
      <HomeCard />
      <div className="card-container">
        {cards && cards.length > 0
          ? cards.map((card, index) => <GenericCard key={index} {...card} />)
          : null}
        {dummyCards.map((card) => (
          <div key={card.id} className="dummy-card">
            <div className="img-container">
              <div className="title">
                <span>{card.title}</span>
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
                  <b>123323</b>
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
                  <b>{card.dailyIncome}</b>
                </span>
              </div>
              <div className="card-details2">
              <span>Total Income</span>
                <span>
                  <b>{card.totalAmount}</b>
                </span>
                </div>
              <button className="buy-button">Buy</button>
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
