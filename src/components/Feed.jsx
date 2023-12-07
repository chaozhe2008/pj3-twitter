import { Box } from "@mui/system";
import React from "react";
import Post from "./Post";

const Feed = () => {
  return (
    <Box flex={4} p={2}>
      <Post username="ALBERT" content="test" time="2023-09-14" />
      <Post username="ALBERT" content="test" time="2023-09-14" />
      <Post username="ALBERT" content="test" time="2023-09-14" />
      <Post username="ALBERT" content="test" time="2023-09-14" />
    </Box>
  );
};

export default Feed;
