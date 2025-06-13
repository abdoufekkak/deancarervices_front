import React, { useState, useEffect } from "react";
import PaymentForm from "../Payement/PaymentForm";
import DeanSummary from "../../../../summary/Summary";
import "../CardInfo/CardInfo.css";
import { Box, Card, CardContent, Grid } from "@mui/material";

import { useSelector } from "react-redux";
import FeatureBar from "../FeatureBar/FeatureBar";
import CarCard from "../Tomobiles/Car";
import Steps from "../../../../Steps/Steps";
export default function PaymentAndSummary() {
  const selectedCar = useSelector((state) => state.process.step2Data);
  const [showExtraInfo, setShowExtraInfo] = useState(false);
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

          {selectedCar && (
            <Box>
              <CarCard
                car={selectedCar}
                isSelected={true}
                onSelect={() => {}}
              />
            </Box>
          )}

          <Card className="card-info">
            <CardContent className="card-content">
              <PaymentForm onContinue={() => setShowExtraInfo(true)} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <DeanSummary />
        </Grid>
      </Grid>
    </Box>
  );
}
