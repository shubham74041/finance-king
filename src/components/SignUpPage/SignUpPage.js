import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.css";
import telegramIcon from "../icons/icons8-telegram-100.png";
import supportIcon from "../icons/contact.png";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("referralCode"); // This should match the query parameter name in the referral link
    if (code) {
      setReferralCode(code);
    }
  }, [location]);

  const handleTele = () => {
    const telegramUsername = "Piyush3029";
    const telegramUrl = `https://t.me/${telegramUsername}`;
    window.open(telegramUrl, "_blank");
  };

  const handleSupport = () => {
    navigate("/contact");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://rajjiowin-backend.vercel.app/signup",
        {
          email,
          phoneNumber,
          password,
          referralCode,
        }
      );

      if (response.data === "exists") {
        alert("User already exists");
      } else if (response.data === "notexists") {
        alert("User Registered Successfully");
        navigate("/");
      } else {
        alert("Unexpected response: " + response.data);
      }
    } catch (err) {
      console.error("Error during signup:", err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup">
      <form>
        <div className="form-container">
          <h2>Rajjowin</h2>
          <div>
            <label className="email-label" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Enter Email"
              id="email"
              className="email_input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mobile-label" htmlFor="phoneNumber">
              Mobile No.
            </label>
            <input
              placeholder="Enter Mobile No."
              id="phoneNumber"
              className="mobile_input"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="password-label" htmlFor="password">
              Password
            </label>
            <input
              className="password_input"
              id="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="referral-label" htmlFor="referralCode">
              Referral Code (optional)
            </label>
            <input
              className="referral_input"
              id="referralCode"
              placeholder="Enter Referral Code"
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </div>
          <button className="register_btn" onClick={handleSignup}>
            Register
          </button>
          <div>
            <p className="register">
              Already have an account? <Link to="/login">Login Here</Link>
            </p>
          </div>
          <button type="button" className="tele_button" onClick={handleTele}>
            <div
              style={{ display: "flex", flexDirection: "row", height: "25px" }}
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
          <button
            type="button"
            onClick={handleSupport}
            className="support_button"
          >
            <div
              style={{ display: "flex", flexDirection: "row", height: "25px" }}
            >
              <img
                src={supportIcon}
                alt="support"
                style={{ width: "30px", height: "30px", marginRight: "5px" }}
              />
              <p style={{ margin: "4px 2px 7px 2px" }}>Contact Support</p>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
