import React from "react";
import { connect } from "react-redux";
import GenericCard from "../GenericCard/GenericCard";
import "./HomePage.css"; // Import CSS file for styling
import NavBar from "../NavBar/NavBar";

const HomePage = ({ cards }) => {
  // Dummy card data
  const dummyCards = [
    {
      id: 1,
      title: "Plan A",
      // description: "This is a description for card 1.",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",

      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Plan B",
      // description: "This is a description for card 2.",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "Plan C",
      // description: "This is a description for card 2.",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image:
        "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Plan D",
      // description: "This is a description for card 2.",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: "Plan E",
      // description: "This is a description for card 2.",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image:
        "https://plus.unsplash.com/premium_photo-1681139760816-d0c39952f9ac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      title: "Plan F",
      // description: "This is a description for card 2.",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      title: "Plan G",
      // description: "This is a description for card 2.",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      title: "Plan H",
      // description: "This is a description for card 2.",
      dailyIncome: 100,
      totalAmount: 1000,
      cycle: "90 days",
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Add more dummy card objects as needed
  ];

  return (
    <div className="home"
    // style={{marginTop: "10%", marginBottom: "10%"}}
    >
      {/* <h1>Home Page</h1> */}
      <div
        style={{
          position: "fixed",
          top: "40px",
          left: 0,
          width: "100%",
          zIndex: "1000",
          borderRadius: "5%"

        }}
      >
        <NavBar />
      </div>
      <div className="card-container">
        {/* Render dummy cards */}
        {cards && cards.length > 0 ? (
          cards.map((card, index) => <GenericCard key={index} {...card} />)
        ) : null}

        {/* Dummy cards */}
        {dummyCards.map((card) => (
          <div key={card.id} className="dummy-card">
            <img src={card.image} alt={card.title} />
            <div className="card-details">
              <h3>{card.title}</h3>
              <p> {"Daily Income: "}
                <i className="fa fa-inr" />
                {card.dailyIncome}</p>
              <p>  {"Total Amount: "}
                <i className="fa fa-inr" />
                {card.totalAmount}
              </p>
              <p>{"Cycle: " + card.cycle}</p>
              <span style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // width: "100%",
              }}>

                <h4> <i class="fa fa-inr"></i> 123323</h4>
                <button className="buy-button">Buy</button>
              </span>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards, // Accessing cards state from Redux store
  };
};

export default connect(mapStateToProps)(HomePage);