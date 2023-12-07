import React from "react";
import {
  Box,
  Container,
  Grid,
  Link,
  Button,
  TextField,
  Typography,
} from "@mui/material";

const SignUpPage = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");

    try {
      const response = await fetch("users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        console.log("User registered successfully");
      } else {
        console.error("Registration failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during registration:", error);
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
          <Grid>
            <Link href="/signin" variant="body2">
              {"Already had an account? Sign In"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
