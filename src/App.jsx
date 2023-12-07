import "./App.css";
import "@fontsource/ibm-plex-mono";
import { Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";
import ProfileCard from "./components/ProfileCard";
import EditPostPage from "./components/EditPostPage";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfileCard />} />
          <Route path="/post/edit/:postId" element={<EditPostPage />} />
          <Route path="/post/new/:postId" element={<EditPostPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
