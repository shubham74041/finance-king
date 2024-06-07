import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import telegramIcon from "../icons/icons8-telegram-100.png";
import "./LoginPage.css";
import { useAuth } from "../AuthProvider"; // Assuming you've defined an AuthContext
import CustomAlert from "../AdminPage/Admin/CustomAlert"; // Import your CustomAlert component

const LoginPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    phoneNumber: "",
    password: "",
  });
  const [showAlert, setShowAlert] = useState(false); // State to control CustomAlert visibility
  const [alertMessage, setAlertMessage] = useState(""); // State to hold alert message
  const auth = useAuth();

  const handleTele = (e) => {
    e.stopPropagation(); // Stop the event propagation
    const telegramUsername = "Rajjowinhelp";
    const telegramUrl = `https://t.me/${telegramUsername}`;
    window.open(telegramUrl, "_blank");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (input.phoneNumber !== "" && input.password !== "") {
      console.log(input);
      // auth.login(input); // Assuming login method is from AuthContext
      // Instead of auth.login, handle the login logic here
      // For demonstration purposes, simulate login success
      setShowAlert(true);
      setAlertMessage("Login successful!"); // Set alert message
      // Simulate redirect to home after 2 seconds
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setShowAlert(true);
      setAlertMessage("Please provide valid input."); // Set alert message
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
  };

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
      {/* CustomAlert component */}
      {showAlert && <CustomAlert message={alertMessage} onClose={closeAlert} />}
    </div>
  );
};

export default LoginPage;
