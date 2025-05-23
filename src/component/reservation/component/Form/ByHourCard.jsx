import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  IconButton,
  Paper,
  Button,
  InputAdornment,
} from "@mui/material";
import {
  CalendarMonth,
  AccessTime,
  People,
  Add,
  Remove,
  Search,
} from "@mui/icons-material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useNavigate } from "react-router-dom"; // Importing useNavigate

function ByHourCard() {
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [passengers, setPassengers] = useState(2);
  const [duration, setDuration] = useState(1); // Duration in hours

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSearch = () => {
    // When search is clicked, navigate to /map and pass the state
    navigate("/map", {
      state: {
        pickupDate,
        pickupTime,
        duration,
        passengers,
      },
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        {/* Date & Time Pickers */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <DatePicker
            label="Pickup date"
            value={pickupDate}
            onChange={setPickupDate}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonth />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <TimePicker
            label="Pickup time"
            value={pickupTime}
            onChange={setPickupTime}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTime />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Box>

        {/* Duration */}
        <TextField
          label="Duration (hours)"
          type="number"
          fullWidth
          margin="normal"
          value={duration}
          onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value)))}
          inputProps={{ min: 1 }}
          required
        />

        {/* Passengers */}
        <Paper
          elevation={0}
          sx={{
            backgroundColor: "#eeeeee",
            p: 2,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Box>
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", mb: 1 }}
            >
              <People sx={{ mr: 1 }} />
              Passengers
            </Typography>
            <Typography fontSize="1.2rem">{passengers}</Typography>
          </Box>
          <Box>
            <IconButton
              onClick={() => setPassengers((prev) => Math.max(1, prev - 1))}
              sx={{
                backgroundColor: "#9e9e9e",
                color: "white",
                "&:hover": { backgroundColor: "#757575" },
                mr: 1,
                width: 32,
                height: 32,
              }}
            >
              <Remove />
            </IconButton>
            <IconButton
              onClick={() => setPassengers((prev) => prev + 1)}
              sx={{
                backgroundColor: "#212121",
                color: "white",
                "&:hover": { backgroundColor: "#000" },
                width: 32,
                height: 32,
              }}
            >
              <Add />
            </IconButton>
          </Box>
        </Paper>

        {/* Search Button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<Search />}
          sx={{ mt: 3, backgroundColor: "#0a97b0", color: "white" }}
          onClick={handleSearch} // Trigger the handleSearch function on click
        >
          SEARCH
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default ByHourCard;
