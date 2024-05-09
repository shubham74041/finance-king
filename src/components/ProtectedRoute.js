// components/PrivateRoute.js

// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { useAuth } from "./AuthContext";

// const PrivateRoute = ({ element, ...rest }) => {
//   const { isAuthenticated } = useAuth();

//   return isAuthenticated ? (
//     <Route {...rest} element={element} />
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default PrivateRoute;

import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = () => {
  const user = useAuth();

  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
};
// import React from "react";
// import { Route, Navigate } from "react-router-dom";
// import { useAuth } from "./AuthProvider";

// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const { user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       element={user ? <Element /> : <Navigate to="/login" replace />}
//     />
//   );
// };

export default ProtectedRoute;
