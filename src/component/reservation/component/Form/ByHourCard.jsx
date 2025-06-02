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
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStep1Data } from "../../../../store/processSlice";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete"; // Assure-toi que ce composant est bien importé

function ByHourCard() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("defined by driver");
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [passengers, setPassengers] = useState(2);
  const [duration, setDuration] = useState(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = () => {
    const formatDate = (date) => {
      if (!date) return null;
      const d = new Date(date);
      if (isNaN(d.getTime())) return null; // <- ajout essentiel
      return `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1
      ).padStart(2, "0")}/${d.getFullYear()}`;
    };

    const formatTime = (time) => {
      if (!time) return null;
      const t = new Date(time);
      if (isNaN(t.getTime())) return null; // <- ajout essentiel
      return `${String(t.getHours()).padStart(2, "0")}:${String(
        t.getMinutes()
      ).padStart(2, "0")}`;
    };

    const data = {
      from,
      pickupDate: formatDate(pickupDate),
      pickupTime: formatTime(pickupTime),
      duration,
      passengers,
      byHour: true,
    };

    dispatch(setStep1Data(data));
    console.log("Dispatched step1Data:", data);

    navigate("/map", { state: data });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ mt: 2 }}>
        {/* From & To Autocomplete */}
        <GooglePlacesAutocomplete
          label="From"
          value={from}
          onChange={setFrom}
        />

        {/* Date & Time Pickers */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
          onClick={handleSearch}
        >
          SEARCH
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default ByHourCard;
