import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
import axios from "axios";
import "./SignUpPage.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("https://rajjiowin-backend.vercel.app/signup", {
          email,
          phoneNumber,
          password,
        })
        .then((res) => {
          if (res.data === "exists") {
            alert("User already exists");
          } else if (res.data === "notexists") {
            navigate("/");
          }
        })
        .catch((err) => {
          alert("Wrong Details!");
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup">
      <form action="POST">
        <div className="form-container">
          <h2>Rajiowin</h2>
          <div>
            <label className="email-label">Email</label>
            <input
              placeholder="Enter Email"
              id="email"
              className="email_input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mobile-label">Mobile No.</label>
            <input
              placeholder="Enter Mobile No."
              id="phoneNumber"
              className="mobile_input"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="password-label">Password</label>
            <input
              className="password_input"
              id="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="register_btn" onClick={handleLogin}>
            Register
          </button>
          <div>
            <p className="register">
              Already have an account? <Link to="/login">Login Here</Link>
            </p>
          </div>
          {/* <p>{message}</p> */}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
