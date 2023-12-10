import React from "react";
import { UserProvider } from "./components/UserContext";
import NavBar from "./components/NavBar";
import AppRoutes from "./AppRoutes";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["lato", "sans-serif"].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <UserProvider>
        <div className="App">
          <NavBar />
          <AppRoutes />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
