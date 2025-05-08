import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  FormHelperText,
  Paper,
  Button,
} from "@mui/material";
import { InfoOutlined, SmsOutlined } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "./ExtraInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep4Data } from "../../../../../store/processSlice"; 
import Steps from "../../../../../Steps/Steps";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

function ExtraInfo() {
  const navigate = useNavigate();
const dispatch = useDispatch();

const step1Data = useSelector((state) => state.process.step1Data);
const step2Data = useSelector((state) => state.process.step2Data);
const step3Data = useSelector((state) => state.process.step3Data);
const step4Data = useSelector((state) => state.process.step4Data);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(setStep4Data(values));   
      console.log("Form submitted:", step1Data);
      console.log("Form submitted:", step2Data);
      console.log("Form submitted:", step3Data);
      console.log("Form submitted:", step4Data);


    },
  });

  return (
    <>
         <Steps activeStep={2} completedSteps={[0, 1,2]} />
    <Card className="extra-info-card">
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Typography variant="h6" className="section-title">
            <InfoOutlined className="section-icon" /> Lead passenger
          </Typography>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={formik.touched.firstName && formik.errors.firstName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <InfoOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={formik.touched.lastName && formik.errors.lastName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <InfoOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs={6} sx={{ mt: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TextField
                fullWidth
                label="Email address"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={
                  formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : "We'll send your booking voucher here."
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <InfoOutlined fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" gutterBottom>
                  Mobile phone number <InfoOutlined fontSize="small" />
                </Typography>
                <PhoneInput
                  country={"us"}
                  enableSearch
                  value={formik.values.phone}
                  onChange={(value) => formik.setFieldValue("phone", value)}
                  inputProps={{
                    name: "phone",
                    required: true,
                  }}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{ width: "100%" }}
                />
                <FormHelperText error={Boolean(formik.touched.phone && formik.errors.phone)}>
                  {formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : "Provide a mobile phone number to contact the lead passenger."}
                </FormHelperText>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <Paper elevation={0} className="sms-box">
              <SmsOutlined className="sms-icon" />
              <Box>
                <Typography fontWeight="bold">Free SMS/text-message updates</Typography>
                <Typography variant="body2">
                  We will send you the information about your driver 6 hours prior to pickup (each
                  way) by text message and e-mail.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ width: "100%", padding: "10px 0" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
    </>

  );
}

export default ExtraInfo;
