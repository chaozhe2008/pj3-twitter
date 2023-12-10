import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography,
  Checkbox,
  Popover,
  MenuItem,
  Snackbar,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShareIcon from "@mui/icons-material/Share";
import { Favorite, FavoriteBorder, MoreHoriz } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

function Post({ postId, username, content, time, onPostUpdate, onPostDelete }) {
  const postTime = new Date(time);
  const navigate = useNavigate();
  const formattedDateTime = `${postTime.toLocaleDateString()} ${postTime.toLocaleTimeString()}`;
  const currentUser = useUser();
  const isAuthor = currentUser === username;
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (action) => {
    if (!isAuthor) {
      setSnackbarOpen(true);
    } else {
      switch (action) {
        case "edit":
          navigate(`/post/edit/${postId}`);
          break;
        case "delete":
          fetch(`/api/posts/${postId}`, { method: "DELETE" })
            .then((response) => {
              if (response.ok) {
                onPostDelete(postId);
              } else {
                console.error("Failed to delete post:", response.statusText);
              }
            })
            .catch((error) => {
              console.error("Error deleting post:", error);
            });
          break;
        default:
          break;
      }
    }
    handlePopoverClose();
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Card sx={{ my: 2 }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        bgcolor="#d3d3d3"
      >
        <Link
          to={`/users/${username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box display="flex" alignItems="center" sx={{ m: 1 }}>
            <Avatar>
              <PersonIcon />
            </Avatar>
            <Typography variant="subtitle1" sx={{ ml: 2 }}>
              {username}
            </Typography>
          </Box>
        </Link>
        <IconButton aria-label="settings" onClick={handlePopoverOpen}>
          <MoreHoriz />
        </IconButton>
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <MenuItem onClick={() => handleMenuItemClick("edit")}>Edit</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick("delete")}>
            Delete
          </MenuItem>
        </Popover>
      </Box>
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: "red" }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ ml: "auto" }}
        >
          {formattedDateTime}
        </Typography>
      </CardActions>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Not Authorized!"
      />
    </Card>
  );
}

export default Post;
