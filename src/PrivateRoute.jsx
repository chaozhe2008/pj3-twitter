import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUser } from "./components/UserContext"; // Import your user context hook

const PrivateRoute = (Component) => {
  const currentUser = useUser();
  const isAuthenticated = !!currentUser;

  return isAuthenticated ? <Component /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
