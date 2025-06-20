import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { Box, Card, CardContent, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setStep1Data } from "../../../../store/processSlice";
import GoogleMaps from "../GoogleMaps/googleMapPage";
import TransferCard from "../../component/Tomobiles/Card";
import Steps from "../../../../Steps/Steps";
import FeatureBar from "../FeatureBar/FeatureBar";
import DeanSummary from "../../../../summary/Summary";
import useCars from "../Tomobiles/hooks/useCare";
import NoCarsAvailable from "../Tomobiles/NoCarsAvailable";
import "../GoogleMaps/GoogleMaps.css";
export default function MapsAndCard() {
  const [distance, setDistance] = useState("");
  const step1 = useSelector((state) => state.process.step1Data);
  const isByHour = !!step1?.byHour;
  const { cars, isLoading, error } = useCars();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Box sx={{ backgroundColor: "#f5f7fa" }}>
        <Box sx={{ mx: "auto", mb: 4 }}>
          <FeatureBar />
        </Box>
        <Box className="map-section">
          <Box className="map-left">
            <Steps />

            {!isByHour && <GoogleMaps />}

            {distance && (
              <div className="distance-info">Distance: {distance}</div>
            )}
            {isLoading ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={200}
              >
                <CircularProgress />
              </Box>
            ) : error ? (
              <Box textAlign="center" color="error.main" mt={2}>
                {error}
              </Box>
            ) : cars.length === 0 ? (
              <NoCarsAvailable />
            ) : (
              <TransferCard cars={cars} />
            )}
          </Box>

          <Card className="card-pay ">
            <CardContent className="card-content-pay ">
              <DeanSummary />
            </CardContent>
          </Card>
        </Box>
      </Box>{" "}
    </>
  );
}
