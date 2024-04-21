// actions.js
export const updateUserData = (userData) => {
  return {
    type: "UPDATE_USER_DATA",
    payload: userData,
  };
};
