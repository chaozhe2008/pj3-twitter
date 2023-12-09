const logOutUser = async (setCurrentUser, navigate) => {
  try {
    const response = await fetch("/api/users/logOut", { method: "POST" });
    const data = await response.json();
    if (data) {
      setCurrentUser(null);
      navigate("/");
    }
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export default logOutUser;
