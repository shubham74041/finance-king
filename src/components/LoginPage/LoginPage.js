import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8080/", { phoneNumber, password })
        .then((res) => {
          if (res.data === "exist") {
            navigate("/"); // Use navigate function to redirect
          } else if (res.data === "notexist") {
            alert("Incorrect Password / User not SignUp!");
          }
        })
        .catch((err) => {
          alert("Wrong details");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <form action="POST">
        <div className="LoginPage">
          <h1>Login Page</h1>
          <div className="phone_number">
            <label className="form-label">Phone-Number:</label>
            <input
              placeholder="phoneNumber"
              id="phoneNumber"
              className="form-control"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="password">
            <label className="form-label">Password:</label>
            <input
              className="form-control"
              id="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          </div>
        </div>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
