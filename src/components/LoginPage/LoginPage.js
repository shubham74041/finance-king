import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import telegramIcon from "../icons/icons8-telegram-100.png";
import supportIcon from "../icons/contact.png";
import "./LoginPage.css";
import { useAuth } from "../AuthProvider"; // Assuming you've defined an AuthContext

const LoginPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleTele = (e) => {
    e.stopPropagation(); // Stop the event propagation
    const telegramUsername = "Rajjowinhelp";

    // Construct the Telegram URL
    const telegramUrl = `https://t.me/${telegramUsername}`;

    // Open the Telegram URL in a new tab or window
    window.open(telegramUrl, "_blank");
  };

  // const handleSupport = () => {
  //   navigate("/contact");
  // };

  const auth = useAuth();
  // const navigate = useNavigate();
  // const { login } = useAuth(); // Access login function from AuthContext

  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    // const phoneNumber = input.phoneNumber;
    if (input.phoneNumber !== "" && input.password !== "") {
      console.log(input);
      auth.login(input);
      return;
    }

    alert("please provide a valid input");
    // try {
    //   const response = await axios.post(
    //     "https://rajjiowin-backend.vercel.app/",
    //     {
    //       phoneNumber,
    //       password,
    //     }
    //   );
    //   console.log(response.data);
    //   if (response.data.message === "exist") {
    //     // Perform any necessary action upon successful login
    //     // For example, storing authentication token or user information
    //     // and then redirecting to the home page
    //     await login(phoneNumber, password); // Update authentication state
    //     navigate("/");
    //   } else if (response.data.message === "notexist") {
    //     setError("Incorrect Password / User not Signed Up!");
    //   }
    // } catch (err) {
    //   setError("Wrong details. Please try again.");
    //   console.error(err);
    // }

    // try {
    //   const response = await axios.get(
    //     `http://localhost:8080/login/${phoneNumber}`,
    //     {}
    //   );
    //   console.log(response.data.userWalletAmount);
    // } catch (error) {
    //   console.error("Error fetching user data:", error);
    // }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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
              // value={phoneNumber}
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
              // value={password}
              onChange={handleInput}
            />
          </div>
          {/* {error && <div className="error">{error}</div>} */}
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
            {/* <div> */}

            <button className="tele_button" onClick={handleTele}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "25px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={telegramIcon}
                  alt="telegram"
                  style={{
                    width: "30px",
                    height: "30px",
                    marginRight: "5px",
                    marginBottom: "2px",
                  }}
                />
                {/* <span style={{ textAlign: "center", margin: "2px 0 3px 0" }}>
                Official Telegram
              </span> */}
                <p style={{ margin: "4px 2px 7px 2px" }}>Telegram</p>
              </div>
            </button>

            {/* <button onClick={handleSupport} className="support_button">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "25px",
                }}
              >
                <img
                  src={supportIcon}
                  alt="support"
                  style={{ width: "30px", height: "30px", marginRight: "5px" }}
                />

                <p style={{ margin: "4px 2px 7px 2px" }}>Contact Support</p>
              </div>
            </button> */}
            {/* </div> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
