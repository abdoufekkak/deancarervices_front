import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Grid,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep3Data } from "../../../../store/processSlice";
import { useDispatch } from "react-redux";
import Steps from "../../../../Steps/Steps";
import "./CardInfo.css";

function CardInfo() {
  const selectedCar = useSelector((state) => state.process.step2Data);
  const [extraInfoCollapsed, setExtraInfoCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const navigate = useNavigate();
  const step3Data = useSelector((state) => state.process.step3Data);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      flightNumber: step3Data.flightNumber || "",
      childSeat: step3Data.childSeat || false,
      chauffeurNotes: step3Data.chauffeurNotes || "",
    },

    validationSchema: Yup.object({
      flightNumber: Yup.string()
        .required("Flight number is required")
        .matches(/^[A-Z]{2}\d{3,4}$/, "Invalid flight number format"),
      chauffeurNotes: Yup.string().max(300, "Notes too long"),
    }),
    onSubmit: (values) => {
      dispatch(setStep3Data(values));
      setIsCollapsed(true); // collapse CardInfo
      setExtraInfoCollapsed(false); // ouvrir ExtraInfo
      navigate("/extra");
    },
  });

  return (
    <Grid>
      {/* Card Formulaire */}
      <Typography
        variant="h6"
        className="title"
        gutterBottom
        onClick={() => setIsCollapsed(!isCollapsed)}
        sx={{ cursor: "pointer" }}
      >
        Extras and notes {isCollapsed ? "▼" : "▲"}
      </Typography>

      <Collapse in={!isCollapsed}>
        <form onSubmit={formik.handleSubmit}>
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

          <FormControlLabel
            control={
              <Checkbox
                name="childSeat"
                checked={formik.values.childSeat}
                onChange={(e) => {
                  const checked = e.target.checked;
                  formik.setFieldValue("childSeat", checked);
                  if (checked) {
                    formik.setFieldValue("chauffeurNotes", "");
                  }
                }}
              />
            }
            label="Do you need a child seat or booster seat?"
            sx={{ mt: 2 }}
          />

          {!formik.values.childSeat && (
            <>
              <Typography className="label" sx={{ mt: 2 }}>
                Notes for the chauffeur (Outward)
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
                  formik.touched.chauffeurNotes && formik.errors.chauffeurNotes
                }
              />
            </>
          )}

          <Box sx={{ mt: 4, textAlign: "right" }}>
            <Button
              type="submit"
              variant="contained"
              className="continue-button"
            >
              CONTINUE
            </Button>
          </Box>
        </form>
      </Collapse>
    </Grid>
  );
}

export default CardInfo;
