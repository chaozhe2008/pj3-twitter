import { AppBar, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{ top: 0 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <TwitterIcon />
          </IconButton>
          <Box>
            <Link to="/signin" style={{ color: "inherit" }}>
              <Button
                color="inherit"
                variant="outlined"
                sx={{ border: "2px solid white" }}
              >
                Sign In
              </Button>
            </Link>
            <Link to="/signup" style={{ color: "inherit" }}>
              <Button
                color="inherit"
                variant="outlined"
                sx={{ ml: 1, border: "2px solid white" }}
              >
                Sign Up
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
