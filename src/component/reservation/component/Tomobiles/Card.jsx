import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import useCars from "./hooks/useCare";
import CarCard from "./Car";
import { useSelector, useDispatch } from "react-redux";
import { setStep2Data } from "../../../../store/processSlice";
import { calculatePrice } from "./hooks/usePriceCalculator";

const CarsList = () => {
  const { cars, isLoading, error } = useCars(); // ⬅️ on récupère directement les voitures
  const [carsList, setCarsList] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);

  const step1 = useSelector((state) => state.process.step1Data);
  const step4 = useSelector((state) => state.process.step4Data);
  const dispatch = useDispatch();

  // Calcule les prix quand les voitures ou les étapes changent
  useEffect(() => {
    if (!cars || cars.length === 0) {
      setCarsList([]);
      return;
    }

    const carsWithPrice = cars
      .map((car) => {
        const price = calculatePrice(car, step1, step4);
        return price ? { ...car, ...price } : null;
      })
      .filter(Boolean);

    if (carsWithPrice.length > 0) {
      dispatch(setStep2Data(carsWithPrice[0]));
    }

    setCarsList(carsWithPrice);
  }, [cars, step1, step4]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={2}>
        Erreur de chargement des voitures.
      </Typography>
    );
  }

  if (carsList.length === 0) {
    return (
      <Typography align="center" mt={2}>
        Aucun véhicule disponible pour votre recherche.
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {carsList.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          price={car.price}
          isSelected={selectedCarId === car.id}
          onSelect={() => setSelectedCarId(car.id)}
        />
      ))}
    </Box>
  );
};

export default CarsList;
