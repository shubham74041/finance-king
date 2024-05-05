import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider"; // Corrected import statement

// import PrivateRoute from "./components/PrivateRoute";
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
import { Link } from "react-router-dom";
import PromotionPage from "./components/PromotionTasks/PromotionPage";
import Wallet from "./components/wallet/Wallet";
import OrderPage from "./components/OrderPage/OrderPage";
import FinancialPage from "./components/FinancialDetail/FinancialPage";
import FollowPage from "./components/FollowUs/FollowPage";
import DownloadPage from "./components/AppDownlaod/DownloadPage";
import SupportPage from "./components/Support/SupportPage";
import ComplaintPage from "./components/Complaint/ComplaintPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <AuthProvider>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "45px",
                zIndex: "1000",
                // background: "linear-gradient(90deg, rgba(18,15,79,1) 1%, rgba(19,19,103,1) 100%, rgba(0,212,255,1) 100%)",
                backgroundColor: "rgb(13, 8, 41)",
                fontFamily: "'Sedan', serif",
                color: "white",
                lineHeight: "39px",
                fontSize: "22px",
                fontWeight: "bold",
                // paddingLeft: "10px",
                borderBottom: "0.5px solid white",
                boxShadow: "1px 1px 1px black",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* <Link to="/" className="navbar-link"> */}
              <span
                style={{
                  // border: "0.5px solid steelblue",
                  padding: "2px",
                  // boxShadow: "1px 1px 1px red",
                  height: "30px",
                }}
              >
                {"Rajiowin"}
              </span>
              {/* </Link> */}
            </div>
            <div>
              <Routes>
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/contact" element={<ContactPage />} />
                </Route>
                <Route path="/user-details" element={<UserDetailsPage />} />
                <Route path="/withdrawal" element={<WithdrawalPage />} />
                <Route path="/Wallet" element={<Wallet />} />
                <Route path="/recharge" element={<RechargePage />} />
                <Route path="/referral" element={<ReferralPage />} />
                <Route path="/logout" element={<LogoutPage />} />

                <Route path="/contact" element={<ContactPage />} />

                {/* <ProtectedRoute path="/contact" element={<ContactPage />} /> */}
                <Route
                  path="/product-details"
                  element={<ProductDetailsPage />}
                />
                <Route path="/total-amount" element={<TotalAmountPage />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/add-card" element={<AddCardPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/promotion-tasks" element={<PromotionPage />} />
                <Route path="/order" element={<OrderPage />} />
                <Route path="/financial" element={<FinancialPage />} />
                <Route path="/download" element={<DownloadPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/complaint" element={<ComplaintPage />} />
                <Route path="/follow" element={<FollowPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
              </Routes>
            </div>
            <Footer />
          </AuthProvider>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
