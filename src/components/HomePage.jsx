import { useState, useEffect } from "react";
import Feed from "./Feed";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/posts");
        const text = await response.text();
        const data = JSON.parse(text);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      <Feed posts={posts} />
    </>
  );
}
