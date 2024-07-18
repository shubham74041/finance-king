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

import PromotionPage from "./components/PromotionTasks/PromotionPage";
import Wallet from "./components/wallet/Wallet";
import OrderPage from "./components/OrderPage/OrderPage";
import FinancialPage from "./components/FinancialDetail/FinancialPage";
import FollowPage from "./components/FollowUs/FollowPage";
import DownloadPage from "./components/AppDownlaod/DownloadPage";
import SupportPage from "./components/Support/SupportPage";
import ComplaintPage from "./components/Complaint/ComplaintPage";
import ProtectedRoute from "./components/ProtectedRoute";
import RechargeDataPage from "./components/AdminPage/Admin/RechargeDataPage";
import WithdrawData from "./components/AdminPage/Admin/WithdrawData";
import CheckIn from "./components/CheckIn/CheckIn";
import UserDetails from "./components/AdminPage/Admin/UserDetails";
import DetailReferral from "./components/AdminPage/Admin/DetailReferral";
import CustomPopup from "./components/AdminPage/Admin/CustomPopup";
import ContactInfo from "./components/AdminPage/Admin/ContactInfo";
import ProductCard from "./components/AdminPage/Admin/ProductCard";
import AdminLogin from "./components/AdminPage/Admin/AdminLogin/AdminLogin";
import AdminPassword from "./components/AdminPage/Admin/AdminLogin/AdminPassword";
import AdminProtectedRoute from "./components/AdminPage/AdminProtectedRoute";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <AuthProvider>
            {/* <div
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

              <span
                style={{
                  // border: "0.5px solid steelblue",
                  padding: "2px",
                  // boxShadow: "1px 1px 1px red",
                  height: "30px",
                }}
              >
                {"Rajjowin"}
              </span>
            </div> */}
            <div>
              <Routes>
                {/* <Route path="/" element={<HomePage />} /> */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/" element={<HomePage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/contact" element={<ContactPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/withdrawal" element={<WithdrawalPage />} />
                </Route>
                <Route path="/user-details" element={<UserDetailsPage />} />
                {/* <Route path="/withdrawal" element={<WithdrawalPage />} /> */}

                <Route element={<ProtectedRoute />}>
                  <Route path="/Wallet" element={<Wallet />} />
                </Route>

                {/* <Route path="/Wallet" element={<Wallet />} /> */}

                <Route element={<ProtectedRoute />}>
                  <Route path="/recharge" element={<RechargePage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/Wallet" element={<Wallet />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/referral" element={<ReferralPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/logout" element={<LogoutPage />} />
                </Route>

                {/* <Route path="/contact" element={<ContactPage />} /> */}

                {/* <ProtectedRoute path="/contact" element={<ContactPage />} /> */}

                <Route element={<ProtectedRoute />}>
                  <Route
                    path="/product-details"
                    element={<ProductDetailsPage />}
                  />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/total-amount" element={<TotalAmountPage />} />
                </Route>

                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/add-card" element={<AddCardPage />} />
                {/* <Route path="/rajiowin-admin" element={<AdminPage />} /> */}

                <Route element={<ProtectedRoute />}>
                  <Route path="/promotion-tasks" element={<PromotionPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/order" element={<OrderPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/financial" element={<FinancialPage />} />
                </Route>

                <Route path="/download" element={<DownloadPage />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/support" element={<SupportPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/complaint" element={<ComplaintPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                  <Route path="/follow" element={<FollowPage />} />
                </Route>

                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/change-password" element={<AdminPassword />} />
                {/* <Route path="/recharge-data" element={<RechargeDataPage />} />
                <Route path="/withdraw-data" element={<WithdrawData />} /> */}
                <Route path="check-in" element={<CheckIn />} />
                {/* <Route path="/users" element={<UserDetails />} />
                <Route path="/details-referral" element={<DetailReferral />} />
                <Route path="/messages" element={<ContactInfo />} />
                <Route path="/custom-popup" element={<CustomPopup />} />
                <Route path="/new-product" element={<ProductCard />} /> */}

                <Route element={<AdminProtectedRoute />}>
                  <Route path="/rajiowin-admin" element={<AdminPage />} />
                  <Route path="/add-card" element={<AddCardPage />} />
                  <Route path="/recharge-data" element={<RechargeDataPage />} />
                  <Route path="/withdraw-data" element={<WithdrawData />} />
                  <Route path="/users" element={<UserDetails />} />
                  <Route
                    path="/details-referral"
                    element={<DetailReferral />}
                  />
                  <Route path="/messages" element={<ContactInfo />} />
                  <Route path="/custom-popup" element={<CustomPopup />} />
                  <Route path="/new-product" element={<ProductCard />} />
                </Route>
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
