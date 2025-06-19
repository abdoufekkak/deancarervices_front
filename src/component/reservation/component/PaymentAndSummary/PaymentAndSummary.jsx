import React, { useState, useEffect } from "react";
import PaymentForm from "../Payement/PaymentForm";
import DeanSummary from "../../../../summary/Summary";
import "../CardInfo/CardInfo.css";
import { Box, Card, CardContent, Grid } from "@mui/material";

import { useSelector } from "react-redux";
import FeatureBar from "../FeatureBar/FeatureBar";
import CarCard from "../Tomobiles/Car";
import Steps from "../../../../Steps/Steps";
import { calculatePrice } from "../Tomobiles/hooks/usePriceCalculator";

export default function PaymentAndSummary() {
  const step1 = useSelector((state) => state.process.step1Data);
  const step4 = useSelector((state) => state.process.step4Data);
  const selectedCar = useSelector((state) => state.process.step2Data);
  const [showExtraInfo, setShowExtraInfo] = useState(false);
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
          <Steps activeStep={3} completedSteps={[0, 1, 2]} />

          {updatedCar && (
            <Box>
              <CarCard car={updatedCar} isSelected={true} onSelect={() => {}} />
            </Box>
          )}

          <Card className="card-info">
            <CardContent className="card-content">
              <PaymentForm onContinue={() => setShowExtraInfo(true)} />
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
