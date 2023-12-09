import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useUserUpdate } from "./UserContext";
import {
  Box,
  Container,
  Grid,
  Link,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import logOutUser from "./public/logOutUser";

const SignUpPage = () => {
  const navigate = useNavigate();
  const currentUser = useUser();
  const setCurrentUser = useUserUpdate();
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (currentUser) {
      logOutUser(setCurrentUser, navigate);
    }
  }, [currentUser, setCurrentUser]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    try {
      const response = await fetch("api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        setCurrentUser(username);
        navigate("/");
      } else {
        const errorText = await response.text();
        console.error("Registration failed:", errorText);
        setErrorMessage(errorText);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage("Error during registration");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="Username"
            label="Username"
            name="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
            </Grid>
            <Grid item>
              <Link href="/signin" variant="body2">
                {"Already had an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
