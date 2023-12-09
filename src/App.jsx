import React from "react";
import { UserProvider } from "./components/UserContext";
import NavBar from "./components/NavBar";
import AppRoutes from "./AppRoutes";
import "./App.css";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <NavBar />
        <AppRoutes />
      </div>
    </UserProvider>
  );
}

export default App;
