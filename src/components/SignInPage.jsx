import {
  Box,
  Container,
  TextField,
  Grid,
  Link,
  Typography,
  Button,
  Alert,
} from "@mui/material";
import { useUser, useUserUpdate } from "./UserContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logOutUser from "./public/logOutUser";

const SignInPage = () => {
  const currentUser = useUser();
  const setCurrentUser = useUserUpdate();
  const navigate = useNavigate();
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
      const response = await fetch("/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const currentUser = await response.json();
        setCurrentUser(currentUser.username);
        navigate("/");
      } else {
        const errorText = await response.text();
        setErrorMessage(errorText);
        console.error("Sign-in failed:", errorText);
      }
    } catch (error) {
      setErrorMessage("Error during sign-in");
      console.error("Error during sign-in:", error);
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
          Sign In
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
            Sign In
          </Button>

          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12}>
              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
            </Grid>
            <Grid>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInPage;
