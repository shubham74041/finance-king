// reducers.js
const initialState = {
    userData: {
      userId: "123456789",
      balance: "10.00",
    },
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "UPDATE_USER_DATA":
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;
  