import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import CommuteIcon from "@mui/icons-material/Commute";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        <Box
          className="left-section"
          onClick={() => navigate("/")}
          sx={{ cursor: "pointer" }}
        >
          <CommuteIcon className="car-icon" />
          <Typography className="name">Dean</Typography>
        </Box>

        <Typography className="booking-text">Reserve your journey</Typography>

        <Box className="right-section">
          <Typography className="booking-text" sx={{ color: "#0a97b0" }}>
            Welcome aboard!
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
