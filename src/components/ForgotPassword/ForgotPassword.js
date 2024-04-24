import { useState } from "react";

const ForgotPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div>
      <h3 style={{ textAlign: "center", marginTop: "60px" }}>
        Forgot Password
      </h3>
      <form action="">
        <div className="phone_number">
          <label className="form-label">Mobile Number:</label>
          <input
            placeholder="phoneNumber"
            id="phoneNumber"
            className="form-control"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="phone_number">
          <label className="form-label">New Password</label>
          <input
            placeholder="Please enter your new password"
            id="new_password"
            className="form-control"
            type="text"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="phone_number">
          <label className="form-label">Confirm Password</label>
          <input
            placeholder="Confirm Password"
            id="confirm_password"
            className="form-control"
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button>Ok</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
