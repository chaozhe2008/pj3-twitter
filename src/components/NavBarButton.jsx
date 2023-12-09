import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function NavBarButton({ url, label, onClick }) {
  if (onClick) {
    // Render a div with an onClick handler
    return (
      <div
        style={{ color: "inherit", textDecoration: "none" }}
        onClick={onClick}
      >
        <Button
          color="inherit"
          variant="outlined"
          sx={{ border: "2px solid white" }}
        >
          {label}
        </Button>
      </div>
    );
  }
  return (
    <>
      <Link to={url} style={{ color: "inherit" }}>
        <Button
          color="inherit"
          variant="outlined"
          sx={{ border: "2px solid white" }}
          onClick={onClick}
        >
          {label}
        </Button>
      </Link>
    </>
  );
}
export default NavBarButton;
