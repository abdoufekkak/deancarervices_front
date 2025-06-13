import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setStep1Data } from "../../../../store/processSlice";
import GoogleMaps from "../GoogleMaps/googleMapPage";
import TransferCard from "../../component/Tomobiles/Card";
import Steps from "../../../../Steps/Steps";
import FeatureBar from "../FeatureBar/FeatureBar";
import DeanSummary from "../../../../summary/Summary";

import "../GoogleMaps/GoogleMaps.css";
export default function MapsAndCard() {
  const [distance, setDistance] = useState("");
  const step1 = useSelector((state) => state.process.step1Data);
  const isByHour = !!step1?.byHour;
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
            <TransferCard />
          </Box>

          <Box className="map-right">
            <DeanSummary />
          </Box>
        </Box>
      </Box>{" "}
    </>
  );
}
