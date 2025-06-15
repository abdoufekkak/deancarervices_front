import React, { useState, useEffect } from "react";

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
import { Formik } from "formik";
import * as Yup from "yup";
import { setStep1Data } from "../../../../store/processSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";
import "./BookingForm.css";
import ByHourCard from "./ByHourCard";
const validationSchema = Yup.object().shape({
  from: Yup.string().required("From is required"),
  to: Yup.string()
    .required("To is required")
    .notOneOf([Yup.ref("from")], "Destination must be different from origin"),
  pickupDate: Yup.date().required("Pickup date is required"),
  pickupTime: Yup.date().required("Pickup time is required"),
 returnDate: Yup.date()
  .nullable()
  .when(["showReturn", "pickupDate", "pickupTime", "returnTime"], {
    is: (showReturn, pickupDate, pickupTime, returnTime) =>
      showReturn && pickupDate && pickupTime && returnTime,
    then: (schema) =>
      schema
        .required("Return date is required")
        .test(
          "is-after-pickup-datetime",
          "Return date and time must be after pickup date and time",
          function (returnDate) {
            const { pickupDate, pickupTime, returnTime } = this.parent;

            const pickupDateTime = new Date(pickupDate);
            pickupDateTime.setHours(new Date(pickupTime).getHours());
            pickupDateTime.setMinutes(new Date(pickupTime).getMinutes());

            const returnDateTime = new Date(returnDate);
            returnDateTime.setHours(new Date(returnTime).getHours());
            returnDateTime.setMinutes(new Date(returnTime).getMinutes());

            return returnDateTime > pickupDateTime;
          }
        ),
  }),

  returnTime: Yup.date()
    .nullable()
    .when("showReturn", {
      is: true,
      then: (schema) => schema.required("Return time is required"),
    }),
  passengers: Yup.number()
    .required("Passengers is required")
    .min(1, "At least 1 passenger"),
  showReturn: Yup.boolean(), // <- important pour accéder à cette valeur dans le schéma
});

function BookingForm() {
  const [tab, setTab] = useState(0);
  const [showReturn, setShowReturn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box className="booking-container">
        <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
          <Tab icon={<LocationOn />} label="Transport" />
          <Tab icon={<AccessTimeFilled />} label="By the Hour" />
        </Tabs>

        {tab === 0 ? (
          <Formik
            initialValues={{
              from: "",
              to: "",
              pickupDate: new Date(),
              pickupTime: new Date(),
              returnDate: null,
              returnTime: null,
              passengers: 2,
              type: 0,
               showReturn: false
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
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
                type: values.returnDate ? 1 : 0,
                pickupDate: formatDate(values.pickupDate),
                pickupTime: formatTime(values.pickupTime),
                returnDate: values.returnDate
                  ? formatDate(values.returnDate)
                  : "",
                returnTime: values.returnTime
                  ? formatTime(values.returnTime)
                  : "",
                byHour: false,
              };
              const request = {
                origin: values.from,
                destination: values.to,
                travelMode: window.google.maps.TravelMode.DRIVING,
              };
              const directionsService = new window.google.maps.DirectionsService();

              directionsService.route(request, (result, status) => {
                if (status === "OK") {
                  dispatch(setStep1Data(serializedValues));
                  navigate("/map", {
                    state: {
                      from: values.from,
                      to: values.to,
                      pickupDate: values.pickupDate,
                      pickupTime: values.pickupTime,
                      returnDate: values.returnDate,
                      returnTime: values.returnTime,
                    },
                  });
                } else {
                }
              }
              )
            }}
          >
            {({ values, errors, touched, setFieldValue, handleSubmit }) => {
              useEffect(() => {
              

                setFieldValue("showReturn",showReturn)
                if (!showReturn) {
                  setFieldValue("returnDate", null);
                  setFieldValue("returnTime", null);
                }
              }, [showReturn, setFieldValue]);

              return (
                <form onSubmit={handleSubmit}>
                  <GooglePlacesAutocomplete
                    label="From"
                    value={values.from}
                    onChange={(val) => setFieldValue("from", val)}
                    error={touched.from && Boolean(errors.from)}
                    helperText={touched.from && errors.from}
                  />
                  <GooglePlacesAutocomplete
                    label="To"
                    value={values.to}
                    onChange={(val) => {
                      if (val === values.from) {
                        setFieldValue("to", "");
                      } else {
                        setFieldValue("to", val);
                      }
                    }}
                    error={touched.to && Boolean(errors.to)}
                    helperText={touched.to && errors.to}
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
                          error={
                            touched.pickupDate && Boolean(errors.pickupDate)
                          }
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
                          error={
                            touched.pickupTime && Boolean(errors.pickupTime)
                          }
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

                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => setShowReturn((prev) => !prev)}
                    className="return-toggle-btn"
                  >
                    {showReturn ? "REMOVE RETURN" : "ADD RETURN"}
                  </Button>

       {showReturn && (
  <Box className="booking-date-time">
    {/* Return Date Error */}
   <Box display={"flex"} flexDirection={"column"}>
      <DatePicker
      label="Return date"
      value={values.returnDate}
      onChange={(val) => setFieldValue("returnDate", val)}
      renderInput={() => (
        <TextField
          {...params}
          fullWidthparams
          error={Boolean(errors.returnDate)}
          helperText={null} // helperText enlevé pour ne pas doubler
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
     {errors.returnDate && (
      <Typography
        variant="caption"
        color="error"
        sx={{ ml: "2px", mb: "2px", mt: "10px", fontSize: "0.75rem" }}
      >
        {errors.returnDate}
      </Typography>
    )}
   </Box>
  

   <Box display={"flex"} flexDirection={"column"}>
    <TimePicker
      label="Return time"
      value={values.returnTime}
      onChange={(val) => setFieldValue("returnTime", val)}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          error={Boolean(errors.returnTime)}
          helperText={null}
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
     {errors.returnTime && (
      <Typography
        variant="caption"
        color="error"
        sx={{ ml: "2px", mb: "2px", mt: "10px", fontSize: "0.75rem" }}
      >
        {errors.returnTime}
      </Typography>
    )}
  </Box>
  </Box>  
)}



                  <Paper elevation={0} className="booking-passenger-box">
                    <Box>
                      <Typography
                        variant="subtitle2"
                        className="booking-passenger-icon"
                      >
                        <People sx={{ mr: 1 }} />
                        Passengers
                      </Typography>
                      <Typography fontSize="1.2rem">
                        {values.passengers}
                      </Typography>
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
        ) : (
          <ByHourCard />
        )}
      </Box>
    </LocalizationProvider>
  );
}

export default BookingForm;
