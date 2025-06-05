// src/components/CarCard.js
import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { People, Work, CheckCircle } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStep2Data } from "../../../../store/processSlice";
import { getImageByType } from "../../../../utils/ulis";

import "./Car.css";

const CarCard = ({ car, isSelected, onSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSelect = () => {
    dispatch(setStep2Data(car));
    navigate("/info");
  };

  return (
    <Card className={`car-card ${isMobile ? "mobile" : ""}`}>
      <Box className={`car-image-box ${isMobile ? "mobile" : ""}`}>
        <CardMedia
          className={`car-image ${isMobile ? "mobile" : ""}`}
          component="img"
          image={getImageByType(car.typeVehicule)}
          alt="Car"
        />
        <Typography className="car-brand" variant="subtitle2">
          {car.marque}
        </Typography>
        <Typography className="car-rating" variant="body2">
          Private transfer <span style={{ color: "gold" }}>★ {car.note}</span>
        </Typography>
      </Box>

      {!isMobile && <Box className="car-divider" />}

      <Box className={`car-info ${isMobile ? "mobile" : ""}`}>
        <Typography className="car-type" variant="h6">
          {car.typeVehicule}
          <Chip
            label="BEST VALUE"
            size="small"
            color="warning"
            sx={{ ml: 1, fontWeight: "bold" }}
          />
        </Typography>
        <Typography className="car-specs" variant="body2">
          <People
            fontSize="small"
            sx={{ mr: 1, verticalAlign: "middle", color: "#0a97b0" }}
          />
          Up to {car.capaciteBagages} Passengers
          <Work
            fontSize="small"
            sx={{ mx: 1, verticalAlign: "middle", color: "#0a97b0" }}
          />
          {car.capaciteBagages} medium suitcases
        </Typography>
        <Box className="car-chips">
          <Chip
            label="Meet & Greet included"
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip
            label="Free Waiting time"
            variant="outlined"
            size="small"
            sx={{ mr: 1 }}
          />
          <Chip label='"Door-to-door"' variant="outlined" size="small" />
        </Box>
      </Box>

      {!isMobile && <Box className="car-divider" />}

      <Box className={`car-price-box ${isMobile ? "mobile" : ""}`}>
        <Typography variant="body2" color="textSecondary">
          Total one-way price
        </Typography>

        <Box>
          <Typography className="car-price" variant="h5" fontWeight="bold">
            {car ? `$${car.total ?? car.aller}` : "Chargement..."}
          </Typography>

          {car && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.85rem", mt: 0.5 }}
            >
              {car.retour ? "(aller / retour)" : "(aller simple)"}
            </Typography>
          )}
        </Box>
        <Chip
          icon={<CheckCircle />}
          label="FREE Cancellation"
          color="success"
          variant="outlined"
          size="small"
          sx={{ mt: 1 }}
        />
        <Typography className="car-price-note" variant="caption">
          ✓ Includes VAT, fees & tip
        </Typography>
        {!isSelected && (
          <Button
            className="car-select-button"
            variant="contained"
            fullWidth={isMobile}
            onClick={handleSelect}
            sx={{ mt: 1 }}
          >
            SELECT
          </Button>
        )}
      </Box>
    </Card>
  );
};

export default CarCard;
