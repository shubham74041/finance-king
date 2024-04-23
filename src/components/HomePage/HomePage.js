import React from 'react';
import { connect } from 'react-redux';
import GenericCard from '../GenericCard/GenericCard';
import './HomePage.css'; // Import CSS file for styling

const HomePage = ({ cards }) => {
    // Dummy card data
    const dummyCards = [
        {
            id: 1,
            title: 'Card 1',
            description: 'This is a description for card 1.',
            image: 'https://via.placeholder.com/150',
        },
        {
            id: 2,
            title: 'Card 2',
            description: 'This is a description for card 2.',
            image: 'https://via.placeholder.com/150',
        },

        {
            id: 2,
            title: 'Card 2',
            description: 'This is a description for card 2.',
            image: 'https://via.placeholder.com/150',
        },{
            id: 2,
            title: 'Card 2',
            description: 'This is a description for card 2.',
            image: 'https://via.placeholder.com/150',
        },{
            id: 2,
            title: 'Card 2',
            description: 'This is a description for card 2.',
            image: 'https://via.placeholder.com/150',
        },{
            id: 2,
            title: 'Card 2',
            description: 'This is a description for card 2.',
            image: 'https://via.placeholder.com/150',
        },{
            id: 2,
            title: 'Card 2',
            description: 'This is a description for card 2.',
            image: 'https://via.placeholder.com/150',
        },
        // Add more dummy card objects as needed
    ];

    return (
        <div>
            <h1>Home Page</h1>
            <div className="card-container">
                {/* Render dummy cards */}
                {cards && cards.length > 0 ? (
                    cards.map((card, index) => (
                        <GenericCard key={index} {...card} />
                    ))
                ) : (
                    null
                //     // <p>No cards available</p>
                )}

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
        cards: state.cards // Accessing cards state from Redux store
    };
};

export default connect(mapStateToProps)(HomePage);
