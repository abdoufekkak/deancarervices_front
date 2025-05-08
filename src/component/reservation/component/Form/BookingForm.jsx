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
import { Formik } from "formik";
import * as Yup from "yup";
import { setStep1Data } from "../../../../store/processSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GooglePlacesAutocomplete from "./GooglePlacesAutocomplete";

const validationSchema = Yup.object().shape({
  from: Yup.string().required("From is required"),
  to: Yup.string().required("To is required"),
  pickupDate: Yup.date().required("Pickup date is required"),
  pickupTime: Yup.date().required("Pickup time is required"),
  returnDate: Yup.date().nullable(),
  returnTime: Yup.date().nullable(),
  passengers: Yup.number()
    .required("Passengers is required")
    .min(1, "At least 1 passenger"),
});

function BookingForm() {
  const [tab, setTab] = useState(0);
  const [showReturn, setShowReturn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Formik
        initialValues={{
          from: "",
          to: "",
          pickupDate: new Date(),
          pickupTime: new Date(),
          returnDate: null,
          returnTime: null,
          passengers: 2,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const serializedValues = {
            ...values,
            pickupDate: values.pickupDate?.toISOString(),
            pickupTime: values.pickupTime?.toISOString(),
            returnDate: values.returnDate ? values.returnDate.toISOString() : null,
            returnTime: values.returnTime ? values.returnTime.toISOString() : null,
          };
        
          dispatch(setStep1Data(serializedValues));
          navigate("/map", { state: { from: values.from, to: values.to, pickupDate: values.pickupDate, pickupTime: values.pickupTime } });
        }}
        
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          setFieldValue,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
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
              <Tabs value={tab} onChange={(e, v) => setTab(v)} centered>
                <Tab icon={<LocationOn />} label="Transport" />
                <Tab icon={<AccessTimeFilled />} label="By the Hour" />
              </Tabs>

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
                onChange={(val) => setFieldValue("to", val)}
                error={touched.to && Boolean(errors.to)}
                helperText={touched.to && errors.to}
              />
              

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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

              {/* TOGGLE RETURN BUTTON */}
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={() => {
                  setShowReturn((prev) => {
                    const newVal = !prev;
                    if (!newVal) {
                      setFieldValue("returnDate", null);
                      setFieldValue("returnTime", null);
                    }
                    return newVal;
                  });
                }}
              >
                {showReturn ? "REMOVE RETURN" : "ADD RETURN"}
              </Button>

              {showReturn && (
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <DatePicker
                    label="Return date"
                    value={values.returnDate}
                    onChange={(val) => setFieldValue("returnDate", val)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={
                          touched.returnDate && Boolean(errors.returnDate)
                        }
                        helperText={touched.returnDate && errors.returnDate}
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
                    value={values.returnTime}
                    onChange={(val) => setFieldValue("returnTime", val)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={
                          touched.returnTime && Boolean(errors.returnTime)
                        }
                        helperText={touched.returnTime && errors.returnTime}
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
                    onClick={() =>
                      setFieldValue("passengers", values.passengers + 1)
                    }
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

              {/* Submit Button */}
              <Button
                variant="contained"
                fullWidth
                startIcon={<Search />}
                type="submit"
                sx={{ mt: 3, backgroundColor: "black", color: "white" }}
              >
                SEARCH
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </LocalizationProvider>
  );
}

export default BookingForm;
