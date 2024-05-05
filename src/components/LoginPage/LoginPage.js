import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";
import "./LoginPage.css";
import { useAuth } from "../AuthProvider"; // Assuming you've defined an AuthContext

const LoginPage = () => {
  const [input, setInput] = useState({
    phoneNumber: "",
    password: "",
  });

  const auth = useAuth();
  // const navigate = useNavigate();
  // const { login } = useAuth(); // Access login function from AuthContext

  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

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
      <form onSubmit={handleLogin}>
        <div className="LoginPage">
          <h1>Rajiowin</h1>
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
          <button className="login_btn">Login</button>
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

export default LoginPage;
