// HomePage.js
import React from 'react';
import GenericCard from '../GenericCard/GenericCard';
// import GenericCa÷rd from './GenericCard';

const HomePage = ({ cards }) => {
    return (
        <div>
            <h1>Home Page</h1>
            <div className="card-container">
                {cards && cards.map((card, index) => (
                    <GenericCard key={index} {...card} />
                ))}
            </div>
        </div>
    );
};

export default HomePage;
