import React from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditPostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/");
    // Add your logic for handling the submit here
    // ...
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
          Edit Post #{postId}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="postContent"
            label="Post Content"
            name="postContent"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Grid>
            <Link href="/" variant="body2">
              {"Back to Home"}
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default EditPostPage;
