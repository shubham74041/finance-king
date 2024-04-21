// AdminPage.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserData } from "./actions";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState("");

  const handleUpdate = () => {
    dispatch(updateUserData({ userId, balance }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default AdminPage;
