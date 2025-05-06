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
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import SearchIcon from "@mui/icons-material/Search";
import DarkModeIcon from "@mui/icons-material/DarkMode"; // optional

import "./NavBar.css";

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" className="navbar">
      <Toolbar className="toolbar">
        {/* Left: Icon + Name */}
        <Box className="left-section">
          <DirectionsCarFilledIcon size={32} className="car-icon" />
          <Typography variant="h6" className="name">
            Dean
          </Typography>
        </Box>

        {/* Center: Phrase */}
        {!isMobile && (
          <Typography variant="subtitle1" className="booking-text">
            Reserve your journey
          </Typography>
        )}

        {/* Right: Search + Theme Toggle */}
        <Box className="right-section">
          <Box className="search-box">
            <InputBase
              placeholder="Search"
              className="search-input"
              inputProps={{ "aria-label": "search" }}
            />
            <SearchIcon className="search-icon" />
          </Box>
          <IconButton className="toggle-icon">
            <DarkModeIcon className="dark" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
