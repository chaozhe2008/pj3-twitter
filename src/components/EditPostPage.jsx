import React, { useState, useEffect } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";

const EditPostPage = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    const fetchOriginalContent = async () => {
      try {
        const response = await fetch(`/api/posts/post/${postId}`);
        const postData = await response.json();
        setEditedContent(postData.content);
      } catch (error) {
        console.error("Error fetching original content:", error);
      }
    };

    fetchOriginalContent();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Error updating post:", await response.text());
      }
    } catch (error) {
      console.error("Error during post update:", error);
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
            multiline
            rows={6}
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
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
        </Box>
      </Box>
    </Container>
  );
};

export default EditPostPage;
