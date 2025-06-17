import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Collapse,
  FormControlLabel,
  InputAdornment,
  Button,
  Radio,
  RadioGroup,
  FormControl,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import useReservation from "../../hook/useReservation";
import useTour from "../../hook/useTour";
import { setStep3Data } from "../../../../store/processSlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import "./PaymentForm.css";
import * as Yup from "yup";
import { CheckCircleOutline } from "@mui/icons-material";
import Mastercard from "../../../../assets/pay/Mastercard-logo.png";
import Maestro from "../../../../assets/pay/Maestro_2016.png";
import American from "../../../../assets/pay/American_Express.png";
import Visa from "../../../../assets/pay/Visa_Logo.png";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const { addReservation } = useReservation();
  const { addTour } = useTour();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const step1Data = useSelector((state) => state.process.step1Data);
  const step2Data = useSelector((state) => state.process.step2Data);
  const step3Data = useSelector((state) => state.process.step3Data);

  const handlePaymentSubmit = async (values) => {
    const fullData = {
      ...step1Data,
      ...step2Data,
      ...step3Data,
      ...values,
    };

    dispatch(setStep3Data({ ...step3Data, ...values })); // met à jour redux avec les infos paiement

    const isByHour = !!step1Data?.byHour;

    const commonPayload = {
      email: step3Data.email,
      phone: step3Data.phone,
      fullName: `${step3Data.firstName} ${step3Data.lastName}`,
      voitureId: step2Data?.id,
      pickupDate: step1Data?.pickupDate,
      pickupTime: step1Data?.pickupTime,
      passengers: step1Data?.passengers,
      total: step2Data?.total,
      etat: "En attente",
      typeVehicule: step2Data?.typeVehicule,
      depart: step1Data?.from,
      distance: step1Data?.distance,
      duree: step1Data?.duration,
      flightNumber: step3Data.flightNumber,
      childSeat: step3Data.childSeat,
      chauffeurNotes: step3Data.chauffeurNotes,
      cardholderName: values.cardholderName,
      cardNumber: values.cardNumber,
      expiryDate: values.expiryDate,
      cvc: values.cvc,
    };

    const fullPayload = {
      ...commonPayload,
      returnDate: step1Data?.returnDate,
      returnTime: step1Data?.returnTime,
      type: step1Data?.type,
      arrivee: step1Data?.to,
    };

    try {
      const response = isByHour
        ? await addTour(commonPayload)
        : await addReservation(fullPayload);
      setIsCollapsed(true);
      setTimeout(() => setShowConfirmation(true), 400);
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
    }
  };
  const validationSchema = Yup.object().shape({
    cardholderName: Yup.string()
      .required("Cardholder name is required")
      .min(2, "Too short")
      .max(50, "Too long"),

    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^\d{13,19}$/, "Card number is not valid"),

    expiryDate: Yup.string()
      .required("Expiry date is required")
      .matches(
        /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
        "Expiry date must be in MM/YY format"
      ),

    cvc: Yup.string()
      .required("CVC is required")
      .matches(/^[0-9]{3}$/, "CVC must be 3 digits"),
  });

  const formik = useFormik({
    initialValues: {
      cardholderName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
    validationSchema,
    onSubmit: handlePaymentSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box className="payment-form-inner-content">
          <Typography variant="h5" className="payment-method-header">
            Payment method
          </Typography>
          <Box className="payment-logos-section">
            <Box className="card-logos-container">
              <img src={Visa} alt="Visa" className="card-logo" />
              <img src={Mastercard} alt="Mastercard" className="card-logo" />
              <img src={Maestro} alt="Maestro" className="card-logo" />
              <img
                src={American}
                alt="American Express"
                className="card-logo"
              />
            </Box>
          </Box>

          <TextField
            fullWidth
            label="Cardholder Name"
            name="cardholderName"
            variant="outlined"
            margin="normal"
            value={formik.values.cardholderName}
            onChange={(e) => {
              const raw = e.target.value;
              const onlyLetters = raw.replace(/[^a-zA-Z\s]/g, "");
              formik.setFieldValue("cardholderName", onlyLetters);
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.cardholderName &&
              Boolean(formik.errors.cardholderName)
            }
            helperText={
              formik.touched.cardholderName && formik.errors.cardholderName
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            className="form-textfield-bottom-margin"
          />

          <TextField
            fullWidth
            label="Card number"
            name="cardNumber"
            variant="outlined"
            margin="normal"
            value={formik.values.cardNumber}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 19) {
                formik.setFieldValue("cardNumber", value);
              }
            }}
            onBlur={formik.handleBlur}
            error={
              formik.touched.cardNumber && Boolean(formik.errors.cardNumber)
            }
            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
            className="form-textfield-bottom-margin"
          />

          <Box className="date-cvc-group">
            <TextField
              label="Month / Year"
              name="expiryDate"
              variant="outlined"
              margin="normal"
              value={formik.values.expiryDate}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  const {
                    selectionStart,
                    selectionEnd,
                    value: raw,
                  } = e.currentTarget;
                  if (
                    selectionStart === selectionEnd &&
                    raw[selectionStart - 1] === "/"
                  ) {
                    e.preventDefault();
                    const newVal =
                      raw.slice(0, selectionStart - 1) +
                      raw.slice(selectionStart);
                    formik.setFieldValue("expiryDate", newVal);
                    setTimeout(() => {
                      const input = e.target;
                      input.setSelectionRange(
                        selectionStart - 1,
                        selectionStart - 1
                      );
                    }, 0);
                  }
                }
              }}
              onChange={(e) => {
                const raw = e.target.value;
                let value = raw.replace(/\D/g, "").slice(0, 4);

                if (value.length === 1 && parseInt(value[0], 10) > 1) {
                  value = "0" + value[0];
                }

                if (value.length >= 2) {
                  let month = parseInt(value.slice(0, 2), 10);
                  if (month > 12 || month === 0) {
                    value = "01" + value.slice(2);
                  }
                }

                if (value.length > 2) {
                  value = value.slice(0, 2) + "/" + value.slice(2);
                } else if (value.length === 2) {
                  if (raw.length > formik.values.expiryDate.length) {
                    value += "/";
                  }
                }

                formik.setFieldValue("expiryDate", value);
              }}
              onBlur={(e) => {
                const value = formik.values.expiryDate;
                const match = /^(\d{2})\/(\d{2})$/.exec(value);

                if (match) {
                  const month = parseInt(match[1], 10);
                  const year = parseInt("20" + match[2], 10);
                  const now = new Date();
                  const currentMonth = now.getMonth() + 1;
                  const currentYear = now.getFullYear();

                  const valid =
                    year > currentYear ||
                    (year === currentYear && month >= currentMonth);

                  formik.setFieldValue("expiryDateValid", valid);
                } else {
                  formik.setFieldValue("expiryDateValid", false);
                }

                formik.handleBlur(e);
              }}
              error={
                formik.touched.expiryDate && Boolean(formik.errors.expiryDate)
              }
              helperText={formik.touched.expiryDate && formik.errors.expiryDate}
              InputProps={{
                style: {
                  color:
                    formik.values.expiryDateValid == null
                      ? undefined
                      : formik.values.expiryDateValid
                      ? "green"
                      : "red",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
              }}
              className="month-year-textfield"
            />

            <TextField
              label="CVC"
              name="cvc"
              variant="outlined"
              margin="normal"
              value={formik.values.cvc}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 3) {
                  formik.setFieldValue("cvc", value);
                }
              }}
              onBlur={formik.handleBlur}
              error={formik.touched.cvc && Boolean(formik.errors.cvc)}
              helperText={formik.touched.cvc && formik.errors.cvc}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                ),
              }}
              className="cvc-textfield"
            />
          </Box>

          <Box className="secure-payment-footer">
            <Typography variant="caption" className="footer-caption-text">
              Secure payment solution provided by
            </Typography>
            <Box className="footer-logos-container">
              <img src={Visa} alt="visa" className="card-logo" />
              <img
                src={Mastercard}
                alt="mastercard"
                className="footer-logo small-logo"
              />

              <img src={Maestro} alt="Maestro" className="card-logo" />
              <img
                src={American}
                alt="American"
                className="footer-logo small-logo"
              />
            </Box>
          </Box>

          <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#0a97b0",
                "&:hover": {
                  backgroundColor: "#087c91",
                },
                padding: "10px 24px",
                minWidth: "120px",
              }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
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
};

export default PaymentForm;
