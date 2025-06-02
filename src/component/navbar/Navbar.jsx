import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  InputBase,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import CommuteIcon from "@mui/icons-material/Commute";
import "./NavBar.css";

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        {/* Left section: Logo + Title */}
        <Box className="left-section">
          <CommuteIcon className="car-icon" />
          <Typography className="name">Dean</Typography>
        </Box>

        {/* Center text: shown only on larger screens */}
        {<Typography className="booking-text">Reserve your journey</Typography>}

        {/* Right section: Search bar + Toggle */}
        <Box className="right-section">
          {/* <IconButton className="toggle-icon">
            <DarkModeIcon />
          </IconButton> */}
          {!isMobile && (
            <Typography className="booking-text" sx={{ color: "#0a97b0" }}>
              Welcome aboard!
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
