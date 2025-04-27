import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  BottomNavigation,
  BottomNavigationAction,
  Fab,
} from "@mui/material";
import {
  Search,
  Home,
  Chat,
  HelpOutline,
  Campaign,
  KeyboardArrowRight,
  ExpandLess,
} from "@mui/icons-material";
import { useState } from "react";

function HelpCenter() {
  const [value, setValue] = useState(2); // Default selected: Help

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        bgcolor: "#fff",
        mt: 5,
      }}
    >
      {/* Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "white", color: "black" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Help
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Content */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search for help"
          variant="outlined"
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
            sx: { borderRadius: 5 },
          }}
          sx={{
            mb: 3,
            bgcolor: "white",
            borderRadius: 5,
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        />

        {/* Collections */}
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          7 collections
        </Typography>

        <Divider sx={{ mb: 0 }} />

        {/* List of Collections */}
        <List>
          <ListItem button>
            <ListItemText
              primary={
                <Typography fontWeight="bold">Getting started</Typography>
              }
              secondary="38 articles"
            />
            <KeyboardArrowRight />
          </ListItem>
          <Divider />

          <ListItem button>
            <ListItemText
              primary={
                <Typography fontWeight="bold">Managing bookings</Typography>
              }
              secondary="11 articles"
            />
            <KeyboardArrowRight />
          </ListItem>
          <Divider />
        </List>
      </Box>

      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={{
          borderTop: "1px solid #e0e0e0",
          bgcolor: "white",
          height: 60,
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<Home />}
          value={0}
          sx={{
            "&.Mui-selected": {
              color: "#FFA500", // Yellow/Orange color when selected
            },
          }}
        />
        <BottomNavigationAction
          label="Messages"
          icon={<Chat />}
          value={1}
          sx={{
            "&.Mui-selected": {
              color: "#FFA500",
            },
          }}
        />
        <BottomNavigationAction
          label="Help"
          icon={<HelpOutline />}
          value={2}
          sx={{
            "&.Mui-selected": {
              color: "#FFA500",
            },
          }}
        />
        <BottomNavigationAction
          label="News"
          icon={<Campaign />}
          value={3}
          sx={{
            "&.Mui-selected": {
              color: "#FFA500",
            },
          }}
        />
      </BottomNavigation>

      {/* Floating Action Button */}
      <Fab
        sx={{
          position: "fixed",
          bottom: 70,
          right: 16,
          bgcolor: "orange",
          color: "white",
          "&:hover": { bgcolor: "orange" },
        }}
        size="medium"
      >
        <ExpandLess />
      </Fab>
    </Box>
  );
}

export default HelpCenter;
