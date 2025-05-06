import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import "./CardInfo.css";
import { setStep3Data } from "../../store/processSlice";
import { useDispatch } from "react-redux";

function CardInfo() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      flightNumber: "",
      childSeat: false,
      chauffeurNotes: "",
    },
    validationSchema: Yup.object({
      flightNumber: Yup.string()
        .required("Flight number is required")
        .matches(/^[A-Z]{2}\d{3,4}$/, "Invalid flight number format"),
      chauffeurNotes: Yup.string().max(300, "Notes too long"),
    }),
    onSubmit: (values) => {
      console.log(values)
      dispatch(setStep3Data(values));   
      navigate("/infos"); // Change to your desired route
    },
  });

  return (
    <Card className="card-info">
      <CardContent className="card-content">
        <form onSubmit={formik.handleSubmit}>
          <div className="section-header">
            <Typography variant="h6" className="title">
              Extras and notes
            </Typography>
          </div>

          <div className="form-section">
            <Typography className="label">
              Flight/train number <span className="question-icon">?</span>
            </Typography>
            <TextField
              name="flightNumber"
              placeholder="Example: LH1868"
              variant="outlined"
              size="small"
              fullWidth
              className="input-field"
              value={formik.values.flightNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.flightNumber && Boolean(formik.errors.flightNumber)
              }
              helperText={
                formik.touched.flightNumber && formik.errors.flightNumber
              }
            />
            <Typography className="helper-text">
              Please provide a flight number (The driver will monitor your flight)
            </Typography>
          </div>

          <div className="form-section">
            <FormControlLabel
              control={
                <Checkbox
                  name="childSeat"
                  checked={formik.values.childSeat}
                  onChange={formik.handleChange}
                />
              }
              label="Do you need a child seat or booster seat?"
            />
          </div>

          <div className="form-section">
            <Typography className="label">
              Notes for the chauffeur (Outward){" "}
              <span className="question-icon">?</span>
            </Typography>
            <TextField
              name="chauffeurNotes"
              multiline
              rows={3}
              placeholder="Baggage information, special requests ..."
              variant="outlined"
              fullWidth
              className="input-field"
              value={formik.values.chauffeurNotes}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.chauffeurNotes &&
                Boolean(formik.errors.chauffeurNotes)
              }
              helperText={
                formik.touched.chauffeurNotes &&
                formik.errors.chauffeurNotes
              }
            />
          </div>

          <div className="button-container" >
            <Button
              type="submit"
              variant="contained"
              className="continue-button"
              sx={{
            
                mt: 5,
              }}
            >
              CONTINUE
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default CardInfo;
