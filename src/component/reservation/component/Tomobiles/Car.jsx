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
import img1 from "../../../../assets/img1.jpg"; // Remplace par une image par défaut
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStep2Data } from "../../../../store/processSlice";
import fetchStep4Data from "../../component/Tomobiles/hooks/fetchStep4Data.jsx";
import { useSelector } from "react-redux";

import "./Car.css";
import CardInfo from "../../../reservation/component/CardInfo/CardInfo.jsx";
import usePriceCalculator from "../../component/Tomobiles/hooks/usePriceCalculator";

const CarCard = ({ car, isSelected, onSelect }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  setStep2Data;
  const handleSelect = () => {
    dispatch(setStep2Data(car)); // enregistre la voiture sélectionnée
    navigate("/info"); // redirige vers la page info
  };

  const calculatePrice = usePriceCalculator(car);
  const [calculatedPrice, setCalculatedPrice] = useState(null);
  // console.log("CarCard: car =", car);
  // console.log("CarCard: calculatePrice =", calculatePrice);
  useEffect(() => {
    dispatch(fetchStep4Data());
  }, [dispatch]);

  useEffect(() => {
    console.log("🔍 Effect triggered - Recalculating price");
    if (calculatePrice !== null) {
      setCalculatedPrice(calculatePrice);
      console.log("✅ Prix calculé:", calculatePrice);
    } else {
      console.log("⛔ Prix non calculé, données manquantes");
    }
  }, [calculatePrice]);

  return (
    <Card className={`car-card ${isMobile ? "mobile" : ""}`}>
      <Box className={`car-image-box ${isMobile ? "mobile" : ""}`}>
        <CardMedia
          className={`car-image ${isMobile ? "mobile" : ""}`}
          component="img"
          image={img1}
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
            {calculatePrice
              ? `$${calculatePrice.total ?? calculatePrice.aller}`
              : "Chargement..."}
          </Typography>

          {calculatePrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: "0.85rem", mt: 0.5 }}
            >
              {calculatePrice.retour ? "(aller / retour)" : "(aller simple)"}
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
