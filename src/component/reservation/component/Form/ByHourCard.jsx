import React from "react";
import {
  Box,
  TextField,
  Button,
  IconButton,
  Typography,
  InputAdornment,
  Paper,
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
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";
import { setStep1Data } from "../../../../store/processSlice";

const validationSchema = Yup.object().shape({
  from: Yup.string().required("From is required"),
  pickupDate: Yup.date().required("Pickup date is required"),
  pickupTime: Yup.date().required("Pickup time is required"),
  duration: Yup.number().min(1, "Minimum 1 hour").required("Required"),
  passengers: Yup.number()
    .required("Passengers is required")
    .min(1, "At least 1 passenger"),
});

function ByHourCard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={{
          from: "",
          pickupDate: new Date(),
          pickupTime: new Date(),
          duration: 1,
          passengers: 2,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const formatDate = (date) => {
            if (!date) return null;
            const d = new Date(date);
            if (isNaN(d.getTime())) return null;
            return `${String(d.getDate()).padStart(2, "0")}/${String(
              d.getMonth() + 1
            ).padStart(2, "0")}/${d.getFullYear()}`;
          };

          const formatTime = (time) => {
            if (!time) return null;
            const t = new Date(time);
            if (isNaN(t.getTime())) return null;
            return `${String(t.getHours()).padStart(2, "0")}:${String(
              t.getMinutes()
            ).padStart(2, "0")}`;
          };

          const serializedValues = {
            ...values,
            pickupDate: formatDate(values.pickupDate),
            pickupTime: formatTime(values.pickupTime),
            byHour: true,
          };

          dispatch(setStep1Data(serializedValues));

          navigate("/map", {
            state: {
              from: values.from,
              pickupDate: values.pickupDate,
              pickupTime: values.pickupTime,
            },
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          setFieldValue,
          handleSubmit,
          handleChange,
        }) => {

          return (
            <form onSubmit={handleSubmit}>
              <GooglePlacesAutocomplete
                label="From"
                value={values.from}
                onChange={(val) => setFieldValue("from", val)}
                error={touched.from && Boolean(errors.from)}
                helperText={touched.from && errors.from}
              />

              <Box className="booking-date-time">
                <DatePicker
                  label="Pickup date"
                  value={values.pickupDate}
                  onChange={(val) => setFieldValue("pickupDate", val)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={touched.pickupDate && Boolean(errors.pickupDate)}
                      helperText={touched.pickupDate && errors.pickupDate}
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
                  value={values.pickupTime}
                  onChange={(val) => setFieldValue("pickupTime", val)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={touched.pickupTime && Boolean(errors.pickupTime)}
                      helperText={touched.pickupTime && errors.pickupTime}
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

              <TextField
                label="Duration (hours)"
                name="duration"
                type="number"
                fullWidth
                margin="normal"
                value={values.duration}
                onChange={(e) =>
                  setFieldValue("duration", Number(e.target.value))
                }
                error={touched.duration && Boolean(errors.duration)}
                helperText={touched.duration && errors.duration}
                inputProps={{ min: 1 }}
              />

              <Paper elevation={0} className="booking-passenger-box">
                <Box>
                  <Typography
                    variant="subtitle2"
                    className="booking-passenger-icon"
                  >
                    <People sx={{ mr: 1 }} />
                    Passengers
                  </Typography>
                  <Typography fontSize="1.2rem">{values.passengers}</Typography>
                </Box>
                <Box>
                  <IconButton
                    onClick={() =>
                      setFieldValue(
                        "passengers",
                        Math.max(1, values.passengers - 1)
                      )
                    }
                    className="passenger-btn-minus"
                  >
                    <Remove />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      setFieldValue("passengers", values.passengers + 1)
                    }
                    className="passenger-btn-plus"
                  >
                    <Add />
                  </IconButton>
                </Box>
              </Paper>

              <Button
                variant="contained"
                fullWidth
                startIcon={<Search />}
                type="submit"
                className="booking-search-btn"
              >
                SEARCH
              </Button>
            </form>
          );
        }}
      </Formik>
    </LocalizationProvider>
  );
}

export default ByHourCard;
