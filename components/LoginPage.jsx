import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const LoginPage = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Hardcoded demo username and password
    const demoUsername = "demo";
    const demoPassword = "password";

    if (username === demoUsername && password === demoPassword) {
      sessionStorage.setItem("authenticated", "true");
      navigate("/home"); // Use navigate function to redirect

      // onLoginSuccess();
    } else {
      alert("Please enter your username and password!");
    }
  };

  return (
    <form action="">
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
          <label className="form-label">Username:</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
    </form>
  );
};

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  onLoginSuccess: PropTypes.func.isRequired,
};
export default LoginPage;
