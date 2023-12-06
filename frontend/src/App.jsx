import "./App.css";
import "@fontsource/ibm-plex-mono";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUp";
import ProfileCard from "./components/ProfileCard";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfileCard />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
