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
  const [showReturn, setShowReturn] = useState(false);
  const [returnDate, setReturnDate] = useState(null);
  const [returnTime, setReturnTime] = useState(null);
  const dispatch = useDispatch();

  const step1Data = useSelector((state) => state.process.step1Data);

  const {
    from,
    to,
    pickupDate,
    pickupTime,
    passengers,
    returnDate: storeReturnDate,
    returnTime: storeReturnTime,
  } = step1Data || {};

  const safeToDate = (val) => {
    const d = new Date(val);
    return isNaN(d) ? null : d;
  };

  useEffect(() => {
    if (storeReturnDate && storeReturnTime) {
      const d = safeToDate(storeReturnDate);
      const t = safeToDate(storeReturnTime);
      if (d && t) {
        setShowReturn(true);
        setReturnDate(d);
        setReturnTime(t);
      }
    }
  }, [storeReturnDate, storeReturnTime]);

  useEffect(() => {
    if (returnDate) {
      dispatch(
        setStep1Data({
          ...step1Data,
          returnDate: returnDate.toISOString(),
        })
      );
    }
  }, [returnDate]);

  useEffect(() => {
    if (returnTime) {
      dispatch(
        setStep1Data({
          ...step1Data,
          returnTime: returnTime.toISOString(),
        })
      );
    }
  }, [returnTime]);

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
          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            color="#0a97b0"
            mb={1}
          >
            Book smart! Add a return journey
          </Typography>
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
              if (showReturn) {
                setReturnDate(null);
                setReturnTime(null);
                dispatch(
                  setStep1Data({
                    ...step1Data,
                    returnDate: null,
                    returnTime: null,
                  })
                );
              }
              setShowReturn((prev) => !prev);
            }}
          >
            {showReturn ? "REMOVE RETURN" : "ADD A RETURN"}
          </Button>

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
