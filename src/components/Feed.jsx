import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import Post from "./Post";

const Feed = ({ posts }) => {
  const [updatedPosts, setUpdatedPosts] = useState(posts);

  useEffect(() => {
    // Update the state when the posts prop changes
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
    }
  };

  const handlePostDelete = (deletedPostId) => {
    const newPosts = updatedPosts.filter((post) => post._id !== deletedPostId);
    setUpdatedPosts(newPosts);
  };

  return (
    <Box flex={4} p={2}>
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
    </Box>
  );
};

export default Feed;
