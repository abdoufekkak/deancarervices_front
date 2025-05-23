import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
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
  const isLargeScreen = useMediaQuery("(min-width:1280px)");

  return (
    <>
      <Box sx={{ backgroundColor: "#f5f7fa" }}>
        {/* Left: Map + Distance + TransferCard */}
        <Box sx={{ mx: "auto", mb: 4 }}>
          <FeatureBar />
        </Box>
        <Box className="map-section">
          <Box className="map-left">
            <Steps />

            <GoogleMaps />

            {distance && (
              <div className="distance-info">Distance: {distance}</div>
            )}
            <TransferCard />
          </Box>

          <Box className="map-right">{isLargeScreen && <DeanSummary />}</Box>
        </Box>
      </Box>{" "}
    </>
  );
}
