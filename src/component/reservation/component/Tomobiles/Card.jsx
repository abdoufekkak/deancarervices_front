import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import useCars from "./hooks/useCare";
import CarCard from "./Car";
import { useSelector, useDispatch } from "react-redux";
import { setStep2Data } from "../../../../store/processSlice";
import { calculatePrice } from "./hooks/usePriceCalculator";

const CarsList = () => {
  const { isLoading, error, fetchCars } = useCars();
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null);

  const step1 = useSelector((state) => state.process.step1Data);
  const step4 = useSelector((state) => state.process.step4Data);
  const dispatch = useDispatch();

useEffect(() => {
  fetchCars()
    .then((data) => {
      const carsWithPrice = data
        .map((car) => {
          const price = calculatePrice(car, step1, step4);
          if (price) {
            return { ...car, ...price };
          }
          return null;
        })
        .filter(Boolean); // Enlève les null

      // Facultatif : stocker le premier calcul dans redux
      if (carsWithPrice.length > 0) {
        dispatch(setStep2Data(carsWithPrice[0]));
      }

      setCars(carsWithPrice);
    })
    .catch((e) => {
      console.error("Erreur :", e);
    });
}, [step1, step4]);


  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        erreur de chargement
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {cars && cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          price={car.price} // 👈 tu passes le prix déjà calculé
          isSelected={selectedCarId === car.id}
          onSelect={() => setSelectedCarId(car.id)}
        />
      ))}
    </Box>
  );
};

export default CarsList;
