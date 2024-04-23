import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:8080/signup", {
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
      <h2>SignUp</h2>

      <form action="POST">
        <div style={{ marginBottom: "15px" }}>
          <label className="form-label">Email:</label>
          <input
            placeholder="email"
            id="email"
            className="form-control"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "3px",
            }}
          />
        </div>

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
          SignUp
        </button>
        {/* <p>{message}</p> */}
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/login">Login Page</Link>
    </div>
  );
};

export default SignUp;
