// reducers/cardReducer.js
const initialState = {
    cards: [] // Initialize cards as an array
};

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_CARD':
            return {
                ...state,
                cards: [...state.cards, action.payload]
            };
        default:
            return state;
    }
};

export default cardReducer;
