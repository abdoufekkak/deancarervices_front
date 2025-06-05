import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  FormHelperText,
  Collapse,
  Button,
} from "@mui/material";
import { InfoOutlined, CheckCircleOutline } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import "./ExtraInfo.css";
import { useDispatch, useSelector } from "react-redux";
import { setStep3Data } from "../../../../../store/processSlice";

import useReservation from "../../../hook/useReservation";
import useTour from "../../../hook/useTour";
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
});

function ExtraInfo() {
  const dispatch = useDispatch();
  const { addReservation } = useReservation();
  const { addTour } = useTour();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const step1Data = useSelector((state) => state.process.step1Data);
  const step2Data = useSelector((state) => state.process.step2Data);
  const step3Data = useSelector((state) => state.process.step3Data);
  // const step4Data = useSelector((state) => state.process.step4Data);


  const handleExtraInfoSubmit = async (values) => {
    dispatch(setStep3Data(values));
    console.log("Submitted:", values);
    console.log("Step1:", step1Data);
    console.log("Step2:", step2Data);
    console.log("Step3:", step3Data);

    const isByHour = !!step1Data?.byHour;
    const fullName = `${values.firstName} ${values.lastName}`;

    const commonPayload = {
      email: values.email,
      phone: values.phone,
      fullName,
      voitureId: step2Data?.id,
      pickupDate: step1Data?.pickupDate,
      pickupTime: step1Data?.pickupTime,
      passengers: step1Data?.passengers,
      total: step2Data?.total,
      etat: "En attente ",
      typeVehicule: step2Data?.typeVehicule,
      depart: step1Data?.from,
      distance: step1Data?.distance,
      duree: step1Data?.duration,
    };

    const fullPayload = {
      ...commonPayload,
      returnDate: step1Data?.returnDate,
      returnTime: step1Data?.returnTime,
      type: step1Data?.type,
      arrivee: step1Data?.to,
    };

    console.log("prix", step2Data?.total);
    try {
      const response = isByHour
        ? await addTour(commonPayload)
        : await addReservation(fullPayload);

      console.log(" Envoi réussi :", response);
      setIsCollapsed(true);
      setTimeout(() => setShowConfirmation(true), 400);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: step3Data.firstName || "",
      lastName: step3Data.lastName || "",
      email: step3Data.email || "",
      phone: step3Data.phone || "",
    },
    validationSchema,
    onSubmit: handleExtraInfoSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {/* Titre Extra Info cliquable */}
        <Typography
          variant="h6"
          className="title"
          gutterBottom
          onClick={() => setIsCollapsed(!isCollapsed)}
          sx={{ cursor: "pointer", mt: 4 }}
        >
          Extra Information {isCollapsed ? "▼" : "▲"}
        </Typography>

        {/* Contenu repliable */}
        <Collapse in={!isCollapsed} timeout={400}>
          <Typography variant="h6" className="section-title" sx={{ mt: 4 }}>
            <InfoOutlined className="section-icon" /> Lead passenger
          </Typography>
          <Box sx={{ display: "flex", gap: 0, mt: 2 }}>
            <Box sx={{ flex: 1, pr: 1 }}>
              <TextField
                fullWidth
                label="Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <InfoOutlined
                        fontSize="small"
                        sx={{ color: "#0a97b0" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box sx={{ flex: 1, pl: 1 }}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <InfoOutlined
                        fontSize="small"
                        sx={{ color: "#0a97b0" }}
                      />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </Box>

          <Grid item xs={12} sx={{ mt: 2 }}>
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
                    <InfoOutlined fontSize="small" sx={{ color: "#0a97b0" }} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography variant="body2" gutterBottom>
                  Mobile phone number{" "}
                  <InfoOutlined fontSize="small" sx={{ color: "#0a97b0" }} />
                </Typography>
                <PhoneInput
                  country={"us"}
                  enableSearch
                  value={formik.values.phone}
                  onChange={(value) => formik.setFieldValue("phone", value)}
                  inputProps={{ name: "phone", required: true }}
                  containerStyle={{ width: "100%" }}
                  inputStyle={{ width: "100%" }}
                />
                <FormHelperText
                  error={Boolean(formik.touched.phone && formik.errors.phone)}
                >
                  {formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : "Provide a mobile phone number to contact the lead passenger."}
                </FormHelperText>
              </Box>
            </Grid>
          </Grid>

          {/* Bouton Submit */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#0a97b0",
                "&:hover": {
                  backgroundColor: "#087c91", // une version plus foncée au survol
                },
                padding: "10px 24px",
                minWidth: "120px", // optionnel pour un look plus propre
              }}
            >
              Submit
            </Button>
          </Box>
        </Collapse>
      </form>

      {/* Carte de confirmation */}
      <Collapse in={showConfirmation} timeout={400}>
        <Card
          sx={{
            mt: 4,
            borderLeft: "6px solid #0a97b0",
            backgroundColor: "#f0fcff",
          }}
        >
          <CardContent sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircleOutline
              sx={{ color: "#0a97b0", fontSize: 40, mr: 2 }}
            />
            <Box>
              <Typography variant="h6" color="primary">
                Your vehicle reservation was successful!
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We’ve received your booking details. A confirmation will be sent
                shortly.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Collapse>
    </>
  );
}

export default ExtraInfo;
