import React from 'react';
import { connect } from 'react-redux';
import { addCard } from '../redux/actions';
import AdminPage from './AdminPage/AdminPage';
import HomePage from './HomePage/HomePage';

const AddCardPage = ({ addCard }) => {
    const handleAddCard = (newCardData) => {
        addCard(newCardData);
    };

    return (
        <div>
            <h1>Add Card</h1>
            {/* Pass handleAddCard function as a prop to AdminPage */}
            <AdminPage onAddCard={handleAddCard} />
            {/* Pass cards state as a prop to HomePage */}
            <HomePage />
        </div>
    );
};

export default connect(null, { addCard })(AddCardPage);
