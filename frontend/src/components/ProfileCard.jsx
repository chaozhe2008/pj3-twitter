import { Avatar, Card, CardHeader } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const ProfileCard = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <PersonIcon></PersonIcon>
          </Avatar>
        }
        title="Username"
        subheader="Joined 2021.09"
      />
    </Card>
  );
};

export default ProfileCard;
