import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function SnackbarMessage({ message, onClose, severity }) {
  console.log(message);
  return (
    <Snackbar
      open={!!message}
      autoHideDuration={2000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MuiAlert elevation={6} variant="filled" severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
