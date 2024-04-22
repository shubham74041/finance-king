// AddCardPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import AdminPage from './AdminPage/AdminPage';
// import AdminPage from './AdminPage';

const AddCardPage = () => {
    const navigate = useNavigate(); // Use useNavigate hook to get navigation function
    const [cards, setCards] = useState([]);

    const handleAddCard = (newCardData) => {
        setCards([...cards, newCardData]);
        // Redirect to home page after adding the card
        navigate('/');
    };

    return (
        <div style={{backgroundColor:"red"}}>
            <h1>Add Card</h1>
            <AdminPage onAddCard={handleAddCard} />
        </div>
    );
};

export default AddCardPage;
