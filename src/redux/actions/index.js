// actions/index.js
export const addCard = (newCardData) => {
    return {
        type: 'ADD_CARD',
        payload: newCardData
    };
};
