import React from "react";
import { connect } from "react-redux";
import GenericCard from "../GenericCard/GenericCard";
import "./HomePage.css"; // Import CSS file for styling

const HomePage = ({ cards }) => {
  // Dummy card data
  const dummyCards = [
    {
      id: 1,
      title: "Card 1",
      description: "This is a description for card 1.",
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "Card 2",
      description: "This is a description for card 2.",
      image:
        "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },

    {
      id: 3,
      title: "Card 3",
      description: "This is a description for card 2.",
      image:
        "https://images.unsplash.com/photo-1564466809058-bf4114d55352?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "Card 4",
      description: "This is a description for card 2.",
      image:
        "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: "Card 5",
      description: "This is a description for card 2.",
      image:
        "https://plus.unsplash.com/premium_photo-1681139760816-d0c39952f9ac?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      title: "Card 6",
      description: "This is a description for card 2.",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1884&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 7,
      title: "Card 7",
      description: "This is a description for card 2.",
      image:
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    // Add more dummy card objects as needed
  ];

  return (
    <div>
      <h1>Home Page</h1>
      <div className="card-container">
        {/* Render dummy cards */}
        {
          cards && cards.length > 0
            ? cards.map((card, index) => <GenericCard key={index} {...card} />)
            : null
          //     // <p>No cards available</p>
        }

        {/* Dummy cards */}
        {dummyCards.map((card) => (
          <div key={card.id} className="dummy-card">
            <img src={card.image} alt={card.title} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
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
