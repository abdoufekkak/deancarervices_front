import React, { useState, useEffect } from "react";
import CardInfo from "../CardInfo/CardInfo";
import DeanSummary from "../../../../summary/Summary";
import "../CardInfo/CardInfo.css";
import { Box, Card, CardContent, Grid, Collapse } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import FeatureBar from "../FeatureBar/FeatureBar";
import CarCard from "../Tomobiles/Car";
import Steps from "../../../../Steps/Steps";
import { calculatePrice } from "../Tomobiles/hooks/usePriceCalculator";

export default function CardAndSummary() {
  const [showExtraInfo, setShowExtraInfo] = useState(false);
  const step1 = useSelector((state) => state.process.step1Data);
  const step4 = useSelector((state) => state.process.step4Data);
  const selectedCar = useSelector((state) => state.process.step2Data);
  const updatedCar = selectedCar
    ? { ...selectedCar, ...calculatePrice(selectedCar, step1, step4) }
    : null;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <Box sx={{ backgroundColor: "#f5f7fa" }}>
      <Box sx={{ mx: "auto", mb: 4 }}>
        <FeatureBar />
      </Box>

      <Grid container spacing={8} sx={{ maxWidth: "1400px", mx: "auto" }}>
        <Grid item xs={12} md={8}>
          <Steps activeStep={2} completedSteps={[0, 1]} />

          {updatedCar && (
            <Box>
              <CarCard car={updatedCar} isSelected={true} onSelect={() => {}} />
            </Box>
          )}

          {/* Card Formulaire */}
          <Card className="card-info">
            <CardContent className="card-content">
              <CardInfo onContinue={() => setShowExtraInfo(true)} />
            </CardContent>
          </Card>
        </Grid>

        <Card className="card-pay ">
          <CardContent className="card-content-pay ">
            <DeanSummary />
          </CardContent>
        </Card>
      </Grid>
    </Box>
  );
}
