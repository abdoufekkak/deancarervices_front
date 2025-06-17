import React, { useState } from "react";
import CardInfo from "../CardInfo/CardInfo";
import DeanSummary from "../../../../summary/Summary";
import "../CardInfo/CardInfo.css";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Collapse,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import FeatureBar from "../FeatureBar/FeatureBar";
import ExtraInfo from "../FeatureBar/ExtraInfo/ExtraInfo";
import CarCard from "../Tomobiles/Car";
import Steps from "../../../../Steps/Steps";
export default function CardAndSummary() {
  const selectedCar = useSelector((state) => state.process.step2Data);
  const [extraInfoCollapsed, setExtraInfoCollapsed] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showExtraInfo, setShowExtraInfo] = useState(false);
<<<<<<< Updated upstream
  const isLargeScreen = useMediaQuery("(min-width:1280px)");
=======
  const [selectedCarId, setSelectedCarId] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
>>>>>>> Stashed changes

  return (
    <Box sx={{ backgroundColor: "#f5f7fa" }}>
      <Box sx={{ mx: "auto", mb: 4 }}>
        <FeatureBar />
      </Box>

      <Grid container spacing={8} sx={{ maxWidth: "1400px", mx: "auto" }}>
        <Grid item xs={12} md={8}>
          <Steps activeStep={2} completedSteps={[0, 1]} />

          {selectedCar && (
            <Box>
              <CarCard
                car={selectedCar}
                price={selectedCar.price}
                isSelected={true}
                onSelect={() => setSelectedCarId(selectedCar.id)}
              />
            </Box>
          )}

          {/* Card Formulaire */}
          <Card className="card-info">
            <CardContent className="card-content">
              <CardInfo onContinue={() => setShowExtraInfo(true)} />
            </CardContent>
          </Card>
        </Grid>

        {isLargeScreen && (
          <Grid item md={4}>
            <DeanSummary />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
