import React from "react";

const UserDetailsPage = () => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "60px" }}>
        User Details Page
      </h2>
      <div>
        <h4>UserId:-</h4>
        <p>9996986494</p>
      </div>
      <div>
        <h4>Email:-</h4>
        <p>demo@gmail.com</p>
      </div>
      <div>
        <h4>Phone-Number:-</h4>
        <p>9996986494</p>
      </div>
      {/* Add content specific to user details */}
    </div>
  );
};

export default UserDetailsPage;
