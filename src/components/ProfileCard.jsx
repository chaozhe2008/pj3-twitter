import { Avatar, Card, CardHeader } from "@mui/material";
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
        title={username}
        subheader={`Joined on ${joinDate}`}
      />
    </Card>
  );
};

export default ProfileCard;
