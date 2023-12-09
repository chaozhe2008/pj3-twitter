import { AppBar, Toolbar, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";
import { Box } from "@mui/system";
import NavBarButton from "./NavBarButton";
import { useNavigate } from "react-router-dom";
import { useUser, useUserUpdate } from "./UserContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import logOutUser from "./public/logOutUser";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NavBar() {
  const navigate = useNavigate();
  const currentUser = useUser();
  const setCurrentUser = useUserUpdate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleLogout = async () => {
    logOutUser(setCurrentUser, navigate);
  };

  const handleAddPost = async () => {
    if (currentUser) {
      navigate("/post/new");
    } else {
      setSnackbarMessage("You must be signed in to add a post");
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ top: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <TwitterIcon />
            </IconButton>
          </Link>
          <Box>
            {currentUser ? (
              <Box sx={{ display: "flex", gap: 2 }}>
                <NavBarButton
                  url="/post/new"
                  label="Add Post"
                  onClick={handleAddPost}
                />
                <NavBarButton url="/" label="Log Out" onClick={handleLogout} />
              </Box>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <NavBarButton url="/signup" label="Sign Up" />
                <NavBarButton url="/signin" label="Sign In" />
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default NavBar;
