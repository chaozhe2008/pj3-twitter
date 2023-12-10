import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUser, useUserUpdate } from "./components/UserContext";

const PrivateRoute = ({ Component, message }) => {
  const currentUser = useUser();
  const isAuthenticated = !!currentUser;
  console.log(isAuthenticated);

  return isAuthenticated ? (
    <Component />
  ) : (
    <Navigate to="/signin" replace={true} state={{ alert: "Please Sign In" }} />
  );
};

export default PrivateRoute;
