import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  Tabs,
  Tab,
  InputAdornment,
  Paper,
} from "@mui/material";

import {
  LocationOn,
  CalendarMonth,
  AccessTime,
  People,
  Add,
  Remove,
  Search,
  AccessTimeFilled,
} from "@mui/icons-material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

function BookingForm() {
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [passengers, setPassengers] = useState(2);
  const [tab, setTab] = useState(0);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 2,
          mt: 5,
          maxWidth: 400,
          mx: "auto",
        }}
      >
        {/* Tabs */}
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
          <Tab icon={<LocationOn />} label="transport" />
          <Tab icon={<AccessTimeFilled />} label="By the Hour" />
        </Tabs>

        {/* From */}
        <TextField
          label="From"
          placeholder="Address, airport, hotel..."
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
        />

        {/* To */}
        <TextField
          label="To"
          placeholder="Address, airport, hotel..."
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationOn />
              </InputAdornment>
            ),
          }}
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

        {/* Add Return */}
        <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
          ADD RETURN
        </Button>

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
            <Typography fontSize="1.2rem">2</Typography>
          </Box>
          <Box>
            <IconButton
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
          sx={{ mt: 3, backgroundColor: "black", color: "white" }}
        >
          SEARCH
        </Button>
      </Box>
    </LocalizationProvider>
  );
}

export default BookingForm;
