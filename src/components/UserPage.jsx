import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Box, Typography } from "@mui/material";
import ProfileCard from "./ProfileCard";
import Feed from "./Feed";

const UserPage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userResponse = await fetch(`/api/users/${username}`);
      const userData = await userResponse.json();
      setUserData(userData);
      const postsResponse = await fetch(`/api/posts/${username}`);
      const postsData = await postsResponse.json();
      setUserPosts(postsData);
    };

    fetchData();
  }, [username]);

  return (
    <Container>
      {userData && (
        <Box>
          <ProfileCard
            username={userData.username}
            timeJoined={userData.timeJoined}
          />
        </Box>
      )}
      <Box sx={{ mt: 4 }}>
        <Feed posts={userPosts} />
      </Box>
    </Container>
  );
};

export default UserPage;
