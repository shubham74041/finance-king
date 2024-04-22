import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import HomePage from './components/HomePage/HomePage';
import UserDetailsPage from './components/UserDetailsPage/UserDetailsPage';
import WithdrawalPage from './components/WithdrawalPage/WithdrawalPage';
import RechargePage from './components/RechargePage/RechargePage';
import ReferralPage from './components/ReferralPage/ReferralPage';
import LogoutPage from './components/LogoutPage/LogoutPage';
import ContactPage from './components/ContactPage/ContactPage';
import ProductDetailsPage from './components/ProductDetailsPage/ProductDetailsPage';
import TotalAmountPage from './components/TotalAmountPage/TotalAmountPage';
import AddCardPage from './components/AddCardPage';

function App() {
    return (
        <Router>
            <div className="App">
                <NavBar />
                <Routes>
                    <Route path="/user-details" element={<UserDetailsPage />} />
                    <Route path="/withdrawal" element={<WithdrawalPage />} />
                    <Route path="/recharge" element={<RechargePage />} />
                    <Route path="/referral" element={<ReferralPage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/product-details" element={<ProductDetailsPage />} />
                    <Route path="/total-amount" element={<TotalAmountPage />} />
                    {/* <Route path="/" element={<HomePage />} /> */}
                    <Route path="/" exact component={HomePage} />
                    <Route path="/add-card" component={AddCardPage} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
