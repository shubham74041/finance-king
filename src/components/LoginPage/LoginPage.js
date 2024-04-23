import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

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
            alert("InCorrect Password / User not SignUp!");
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
        <div
          className="LoginPage"
          style={{
            width: "400px",
            margin: "200px auto",
            padding: "20px 40px 20px 20px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <h1>Login Page</h1>
          <div style={{ marginBottom: "15px" }}>
            <label className="form-label">Phone-Number:</label>
            <input
              placeholder="phoneNumber"
              id="phoneNumber"
              className="form-control"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label className="form-label">Password:</label>
            <input
              className="form-control"
              id="password"
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "3px",
              }}
            />
          </div>
          <button
            onClick={handleLogin}
            style={{
              width: "50%",
              marginLeft: "25%",
              padding: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Login
          </button>
          {/* <p>{message}</p> */}
        </div>
        <br />
        <p>OR</p>
        <br />
        <Link to="/signup">SignUp</Link>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};
export default LoginPage;
