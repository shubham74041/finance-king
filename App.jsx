// import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const handleLoginSuccess = () => {
  //   setIsLoggedIn(true);
  // };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<ProtectedRoute />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>

    // {/* {!isLoggedIn ? (
    //       <LoginPage onLoginSuccess={handleLoginSuccess} />
    //     ) : (
    //       <HomePage />
    //     )} */}
  );
}

const ProtectedRoute = () => {
  const isAuthenticated = sessionStorage.getItem("authenticated") === "true";
  return isAuthenticated ? <HomePage /> : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
export default App;
