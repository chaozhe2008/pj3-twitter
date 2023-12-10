import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Post from "./Post";
import SnackbarMessage from "./public/SnackbarMessage";

const Feed = ({ posts }) => {
  const [updatedPosts, setUpdatedPosts] = useState(posts);
  const [snackbarMessage, setSnackbarMessage] = useState(null);

  useEffect(() => {
    setUpdatedPosts(posts);
  }, [posts]);

  const sortedPosts = updatedPosts.sort(
    (a, b) => new Date(b.timePosted) - new Date(a.timePosted)
  );

  const handlePostUpdate = (updatedPost) => {
    const index = updatedPosts.findIndex(
      (post) => post._id === updatedPost._id
    );

    if (index !== -1) {
      const newPosts = [...updatedPosts];
      newPosts[index] = updatedPost;
      setUpdatedPosts(newPosts);
      setSnackbarMessage("Post Updated!");
    }
  };

  const handlePostDelete = (deletedPostId) => {
    const newPosts = updatedPosts.filter((post) => post._id !== deletedPostId);
    setUpdatedPosts(newPosts);
    setSnackbarMessage("Post Deleted!");
  };

  const handleSnackbarClose = () => {
    setSnackbarMessage(null);
  };

  return (
    <Box flex={4}>
      {sortedPosts.map((post) => (
        <Post
          key={post._id}
          postId={post._id}
          username={post.username}
          content={post.content}
          time={post.timePosted}
          onPostUpdate={handlePostUpdate}
          onPostDelete={handlePostDelete}
        />
      ))}
      <SnackbarMessage
        message={snackbarMessage}
        onClose={handleSnackbarClose}
        severity="success"
      />
    </Box>
  );
};

export default Feed;
