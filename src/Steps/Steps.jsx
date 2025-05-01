import React from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";
import "./Steps.css"; // CSS file

function Steps({ activeStep = 0 }) {
  const steps = ["VEHICLE", "EXTRAS", "DETAILS"];

  return (
    <Box className="steps-container">
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel className="step-label">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default Steps;
