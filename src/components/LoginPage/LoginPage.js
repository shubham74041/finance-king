import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import "./LoginPage.css";
import { useAuth } from "../AuthContext"; // Assuming you've defined an AuthContext

const LoginPage = ({ history, onLoginSuccess }) => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Access login function from AuthContext

  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://rajjiowin-backend.vercel.app/",
        {
          phoneNumber,
          password,
        }
      );
      console.log(response.data);
      if (response.data.message === "exist") {
        // Perform any necessary action upon successful login
        // For example, storing authentication token or user information
        // and then redirecting to the home page
        login(); // Update authentication state
        navigate("/");
      } else if (response.data.message === "notexist") {
        setError("Incorrect Password / User not Signed Up!");
      }
    } catch (err) {
      setError("Wrong details. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
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
          {error && <div className="error">{error}</div>}
          <p className="forgot">
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
          <button type="submit" className="login_btn">
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
