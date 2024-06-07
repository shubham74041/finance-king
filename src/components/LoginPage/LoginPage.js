import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import telegramIcon from "../icons/icons8-telegram-100.png";
import "./LoginPage.css";
import { useAuth } from "../AuthProvider";
import CustomAlert from "../AdminPage/Admin/CustomAlert";

const LoginPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    phoneNumber: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const auth = useAuth();

  const handleTele = (e) => {
    e.stopPropagation();
    const telegramUsername = "Rajjowinhelp";
    const telegramUrl = `https://t.me/${telegramUsername}`;
    window.open(telegramUrl, "_blank");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (input.phoneNumber !== "" && input.password !== "") {
      console.log(input);
      setShowAlert(true);
      setAlertMessage("Login successful!");
    } else {
      setShowAlert(true);
      setAlertMessage("Please provide valid input.");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const closeAlert = () => {
    setShowAlert(false);
    if (alertMessage === "Login successful!") {
      // Redirect to home after closing the alert
      navigate("/");
    }
  };

  useEffect(() => {
    if (showAlert && alertMessage === "Login successful!") {
      // Redirect to home after 2 seconds
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);

      // Clear timeout if component unmounts or alert closes
      return () => clearTimeout(timer);
    }
  }, [showAlert, alertMessage, navigate]);

  return (
    <div className="login">
      <form>
        <div className="LoginPage">
          <h1>Rajjowin</h1>
          <div className="phone_number">
            <label htmlFor="phoneNumber" className="login-label">
              Mobile No.
            </label>
            <input
              placeholder="Enter Mobile No."
              id="phoneNumber"
              className="input_box input_box1"
              type="number"
              name="phoneNumber"
              value={input.phoneNumber}
              onChange={handleInput}
            />
          </div>
          <div className="password">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <input
              className="input_box input_box2"
              id="password"
              placeholder="Enter Password"
              type="password"
              name="password"
              value={input.password}
              onChange={handleInput}
            />
          </div>
          <p className="forgot">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <button onClick={handleLogin} className="login_btn">
            Login
          </button>
          <div>
            <p className="register">
              Don't have an account? <Link to="/signup">Register Now</Link>
            </p>
            <button className="tele_button" onClick={handleTele}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "25px",
                }}
              >
                <img
                  src={telegramIcon}
                  alt="telegram"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "5px",
                    marginBottom: "5px",
                  }}
                />
                <p style={{ margin: "4px 2px 7px 2px" }}>Official Telegram</p>
              </div>
            </button>
          </div>
        </div>
      </form>
      {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};

export default LoginPage;
