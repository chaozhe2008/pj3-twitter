import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import ProfileCard from "./components/ProfileCard";
import EditPostPage from "./components/EditPostPage";
import NewPostPage from "./components/NewPostPage";
import UserPage from "./components/UserPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/post/edit/:postId"
        element={<PrivateRoute Component={EditPostPage} />}
      />
      <Route
        path="/post/new"
        element={<PrivateRoute Component={NewPostPage} />}
      />
      <Route path="/users/:username" element={<UserPage />} />
    </Routes>
  );
};

export default AppRoutes;
