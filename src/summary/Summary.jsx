import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  RadioButtonChecked,
  CalendarMonth,
  AccessTime,
  People,
  Route,
  AvTimer,
  CompareArrows,
} from "@mui/icons-material";
import {
  LocalizationProvider,
  DatePicker,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useSelector, useDispatch } from "react-redux";
import { setStep1Data } from "../store/processSlice";

function DeanSummary() {
  const step1Data = useSelector((state) => state.process.step1Data);

  const [showReturn, setShowReturn] = useState(
    step1Data?.returnDate && step1Data?.returnTime ? true : false
  );
  const [returnDate, setReturnDate] = useState(null);
  const [returnTime, setReturnTime] = useState(null);

  useEffect(() => {
    if (step1Data?.returnDate) {
      const [day, month, year] = step1Data.returnDate.split("/").map(Number);
      const dateObj = new Date(year, month - 1, day);
      setReturnDate(dateObj);
      setShowReturn(true);
    }
    if (step1Data?.returnTime) {
      const [hours, minutes] = step1Data.returnTime.split(":").map(Number);
      const now = new Date();
      now.setHours(hours, minutes, 0, 0);
      setReturnTime(now);
      setShowReturn(true);
    }
  }, [step1Data.returnDate, step1Data.returnTime]);

  const dispatch = useDispatch();

  const {
    from,
    to,
    pickupDate,
    pickupTime,
    passengers,
    returnDate: storeReturnDate,
    returnTime: storeReturnTime,
  } = step1Data || {};
  const isByHour = !!step1Data?.byHour;

  useEffect(() => {
    if (returnDate instanceof Date && !isNaN(returnDate)) {
      const formattedDate = returnDate
        .toLocaleDateString("fr-FR")
        .split("/")
        .join("/");
      dispatch(
        setStep1Data({
          ...step1Data,
          returnDate: formattedDate,
        })
      );
    }
  }, [returnDate]);

  useEffect(() => {
    if (returnTime instanceof Date && !isNaN(returnTime)) {
      const hours = returnTime.getHours().toString().padStart(2, "0");
      const minutes = returnTime.getMinutes().toString().padStart(2, "0");
      const formattedTime = `${hours}:${minutes}`; // ex: "05:00"
      dispatch(
        setStep1Data({
          ...step1Data,
          returnTime: formattedTime,
        })
      );
    }
  }, [returnTime]);
  useEffect(() => {
    console.log("step1Data a changé :", step1Data);
  }, [step1Data]);
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        p: 2,
        maxWidth: 350,
        mx: "auto",
        mt: 2,
        backgroundColor: "white",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Your Dean
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Box display="flex" alignItems="center" mb={1}>
          <RadioButtonChecked
            fontSize="small"
            sx={{ color: "grey.600", mr: 1 }}
          />
          <Typography variant="body1" fontWeight="medium">
            Outward journey
          </Typography>
        </Box>

        <Box ml={3} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            {step1Data?.from ? `${step1Data.from}` : "depart inconnue"}{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            {step1Data?.from ? `${step1Data.from}` : "depart inconnue"}{" "}
          </Typography>

          <Box
            sx={{ borderLeft: "2px dashed grey", height: 20, ml: "7px", mb: 1 }}
          />

          <Typography variant="subtitle1" fontWeight="bold">
            {to || "To location"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {to || "To location"}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <CalendarMonth sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">{pickupDate}</Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <AccessTime sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">{pickupTime}</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {!isByHour && (
            <Typography
              variant="caption"
              display="block"
              textAlign="center"
              color="#0a97b0"
              mb={1}
            >
              Book smart! Add a return journey
            </Typography>
          )}
          {!isByHour &&
            (!storeReturnDate || !storeReturnTime ? (
              <Button
                variant="contained"
                fullWidth
                startIcon={<CompareArrows />}
                sx={{
                  background: "linear-gradient(to right, #0a97b0, #0a97b0)",
                  color: "white",
                  fontWeight: "bold",
                  mb: 2,
                }}
                onClick={() => {
                  setShowReturn(true);
                }}
              >
                ADD A RETURN
              </Button>
            ) : (
              <Button
                variant="contained"
                fullWidth
                startIcon={<CompareArrows />}
                sx={{
                  background: "linear-gradient(to right, #0a97b0, #0a97b0)",
                  color: "white",
                  fontWeight: "bold",
                  mb: 2,
                }}
                onClick={() => {
                  setReturnDate(null);
                  setReturnTime(null);
                  setShowReturn(false);
                  dispatch(
                    setStep1Data({
                      ...step1Data,
                      returnDate: null,
                      returnTime: null,
                    })
                  );
                }}
              >
                REMOVE RETURN
              </Button>
            ))}

          {showReturn && (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <DatePicker
                label="Return date"
                value={returnDate}
                onChange={setReturnDate}
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
                label="Return time"
                value={returnTime}
                onChange={setReturnTime}
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
          )}
        </LocalizationProvider>

        <Divider sx={{ mb: 2, mt: 2 }} />

        <Box display="flex" alignItems="center" mb={1}>
          <People sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">
            {passengers || 1} PASSENGER{passengers > 1 ? "S" : ""}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <Route sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">
            {step1Data?.distance
              ? `${step1Data.distance}`
              : "Distance inconnue"}
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <AvTimer sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">
            {step1Data?.duration ? `${step1Data.duration}` : "Durée inconnue"}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DeanSummary;
