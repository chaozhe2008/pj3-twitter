import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const ProfileCard = ({ username, timeJoined }) => {
  const joinTime = new Date(timeJoined);
  const joinDate = `${joinTime.toLocaleDateString()}`;
  return (
    <Card sx={{ mt: 2 }}>
      <CardHeader
        avatar={
          <Avatar>
            <PersonIcon></PersonIcon>
          </Avatar>
        }
        title={
          <Typography variant="h6" fontWeight="bold">
            {username}
          </Typography>
        }
        subheader={`Joined on ${joinDate}`}
      />
    </Card>
  );
};

export default ProfileCard;
