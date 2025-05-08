// src/components/CarCard.js
import React from "react";
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

const CarCard = ({ car }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  setStep2Data
  return (
    <Card
      sx={{
        display: "inline-flex",
        flexDirection: isMobile ? "column" : "row",
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        mb: 2,
        mt: 2,
        ml: 5,
        alignItems: isMobile ? "flex-start" : "stretch",
        alignSelf: "center",
      }}
    >
      {/* Image */}
      <Box sx={{ display: "flex", flexDirection: "column", mt: isMobile ? 2 : 0 }}>
        <CardMedia
          component="img"
          image={img1}
          alt="Car"
          sx={{
            width: isMobile ? "100%" : 180,
            height: isMobile ? 180 : "auto",
            borderRadius: 2,
            objectFit: "cover",
          }}
        />
        <Typography variant="subtitle2" sx={{ mt: 2, color: "gray", fontStyle: "italic", textAlign: "center" }}>
          {car.marque}
        </Typography>
        <Typography variant="body2" fontWeight="bold" sx={{ mt: 0.5 }}>
          Private transfer <span style={{ color: "gold" }}>★ {car.note}</span>
        </Typography>
      </Box>

      {/* Divider */}
      {!isMobile && <Box sx={{ width: "1px", backgroundColor: "#ccc", mx: 2 }} />}

      {/* Info */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", mt: isMobile ? 2 : 0 }}>
        <Typography variant="h6" fontWeight="bold">
          {car.typeVehicule}
          <Chip label="BEST VALUE" size="small" color="warning" sx={{ ml: 1, fontWeight: "bold" }} />
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <People fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
          Up to {car.capaciteBagages} Passengers
          <Work fontSize="small" sx={{ mx: 1, verticalAlign: "middle" }} />
          {car.capaciteBagages} medium suitcases
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Chip label="Meet & Greet included" variant="outlined" size="small" sx={{ mr: 1 }} />
          <Chip label="Free Waiting time" variant="outlined" size="small" sx={{ mr: 1 }} />
          <Chip label='"Door-to-door"' variant="outlined" size="small" />
        </Box>
      </Box>

      {/* Divider */}
      {!isMobile && <Box sx={{ width: "1px", backgroundColor: "#ccc", mx: 2 }} />}

      {/* Price */}
      <Box sx={{ textAlign: isMobile ? "left" : "right", minWidth: isMobile ? "100%" : 160, mt: isMobile ? 2 : 0 }}>
        <Typography variant="body2" color="textSecondary">
          Total one-way price
        </Typography>
        <Typography variant="h5" fontWeight="bold" sx={{ mt: 1 }}>
          $87.20
        </Typography>
        <Chip icon={<CheckCircle />} label="FREE Cancellation" color="success" variant="outlined" size="small" sx={{ mt: 1 }} />
        <Typography variant="caption" sx={{ mt: 0.5, display: "block" }}>
          ✓ Includes VAT, fees & tip
        </Typography>
        <Button
          variant="contained"
          sx={{
            mt: 1.5,
            background: "linear-gradient(to right, #000, #333)",
            color: "white",
            fontWeight: "bold",
          }}
          fullWidth={isMobile}
          onClick={() => {
            dispatch(  setStep2Data(car));
            navigate("/Info"); // redirige vers la page souhaitée
          }}
        >
          SELECT
        </Button>
      </Box>
    </Card>
  );
};

export default CarCard;
