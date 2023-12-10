import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Feed from "./Feed";
import SnackbarMessage from "./public/SnackbarMessage";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const location = useLocation();
  const alertMessage = location.state?.alert;

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

  useEffect(() => {
    if (alertMessage) {
      setShowSnackbar(true);
      setTimeout(() => {
        setShowSnackbar(false);
      }, 2000);
    }
  }, [alertMessage]);

  return (
    <>
      <Feed posts={posts} />
      {showSnackbar && (
        <div>
          <SnackbarMessage message={alertMessage} severity="success" />
        </div>
      )}
    </>
  );
}
