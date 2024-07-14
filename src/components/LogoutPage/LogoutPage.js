import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../AuthProvider";

const LogoutPage = () => {
  //   const navigate = Navigate();
  const { logout } = useAuth();

  //   const [isLoggedIn, setIsLoggedIn] = useState(true);

  //   const handleLogout = () => {
  //     setIsLoggedIn(false);

  //     navigate("/login");
  //   };
  logout();

  return <Navigate to="/login" />;
};

export default LogoutPage;
