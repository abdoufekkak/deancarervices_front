// src/pages/ExtraInfoPage.jsx
import React, { useState, useEffect } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import FeatureBar from "../FeatureBar/FeatureBar";
import CarCard from "../Tomobiles/Car";
import ExtraInfo from "../FeatureBar/ExtraInfo/ExtraInfo";
import DeanSummary from "../../../../summary/Summary";
import { useSelector } from "react-redux";
import "../CardInfo/CardInfo.css";
import { useNavigate } from "react-router-dom";
import Steps from "../../../../Steps/Steps";

export default function ExtraInfoPage() {
  const [extraInfoCollapsed, setExtraInfoCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const selectedCar = useSelector((state) => state.process.step2Data);
  const navigate = useNavigate();

  const handleToggle = () => {
    if (isCollapsed) {
      navigate("/info");
    } else {
      setIsCollapsed(true);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f5f7fa" }}>
      <Box sx={{ mx: "auto", mb: 4 }}>
        <FeatureBar />
      </Box>

      <Grid container spacing={8} sx={{ maxWidth: "1400px", mx: "auto" }}>
        <Grid item xs={12} md={8}>
          <Steps activeStep={2} completedSteps={[0, 1, 2]} />
          {selectedCar && (
            <Box sx={{ mb: 2 }}>
              <CarCard
                car={selectedCar}
                isSelected={true}
                onSelect={() => {}}
              />
            </Box>
          )}

          <Card className="card-info">
            <CardContent className="card-content">
              <Typography
                variant="h6"
                className="title"
                gutterBottom
                onClick={handleToggle}
                sx={{ cursor: "pointer" }}
              >
                Extras and notes {isCollapsed ? "▼" : "▲"}
              </Typography>
            </CardContent>
          </Card>
          <Card className="card-info">
            <CardContent className="card-content">
              <ExtraInfo
                collapsed={extraInfoCollapsed}
                setCollapsed={setExtraInfoCollapsed}
              />
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
