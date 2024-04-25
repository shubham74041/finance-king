import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import HomePage from "./components/HomePage/HomePage";
import UserDetailsPage from "./components/UserDetailsPage/UserDetailsPage";

import AddCardPage from "./components/AddCardPage";
import AdminPage from "./components/AdminPage/AdminPage";
import { Provider } from "react-redux";
import store from "./store";
import WithdrawalPage from "./components/WithdrawalPage/WithdrawalPage";
import RechargePage from "./components/RechargePage/RechargePage";
import ReferralPage from "./components/ReferralPage/ReferralPage";
import LogoutPage from "./components/LogoutPage/LogoutPage";
import ContactPage from "./components/ContactPage/ContactPage";
import ProductDetailsPage from "./components/ProductDetailsPage/ProductDetailsPage";
import TotalAmountPage from "./components/TotalAmountPage/TotalAmountPage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Provide the Redux store */}
      <Router>
        <div className="App">
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "40px",
              zIndex: "1000",
              background:
                "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(93,93,99,1) 35%, rgba(0,212,255,1) 100%)",
              fontFamily: "'Sedan', serif",
              color: "white", // Bright color for text
              // textAlign: "center", // Center-align the text
              lineHeight: "40px", // Vertical centering
              fontSize: "24px", // Font size
              fontWeight: "bold", // Bold font weight
              paddingLeft: "10px",
            }}
          >
            Rajiowin
          </div>

          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/user-details" element={<UserDetailsPage />} />
              <Route path="/withdrawal" element={<WithdrawalPage />} />
              <Route path="/recharge" element={<RechargePage />} />
              <Route path="/referral" element={<ReferralPage />} />
              <Route path="/logout" element={<LogoutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/product-details" element={<ProductDetailsPage />} />
              <Route path="/total-amount" element={<TotalAmountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/add-card" element={<AddCardPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
