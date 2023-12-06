import { Grid, Box, Checkbox } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import PersonIcon from "@mui/icons-material/Person";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import EditIcon from "@mui/icons-material/Edit";
import { Favorite, FavoriteBorder } from "@mui/icons-material";

function Post({ username, content, time }) {
  return (
    <Card sx={{ margin: "10px" }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        px={2}
        bgcolor="#d3d3d3"
      >
        <Box display="flex" alignItems="center" sx={{ m: 1 }}>
          <Avatar>
            <PersonIcon></PersonIcon>
          </Avatar>
          <Typography variant="subtitle1" sx={{ ml: 2 }}>
            title
          </Typography>
        </Box>
        <IconButton aria-label="settings">
          <EditIcon />
        </IconButton>
      </Box>
      <CardContent sx={{ textAlign: "left" }}>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
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
          {time}
        </Typography>
      </CardActions>
    </Card>
  );
}

export default Post;
