import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import CarCard from "./Car";
import { useSelector, useDispatch } from "react-redux";
import { setStep2Data } from "../../../../store/processSlice";
import { calculatePrice } from "./hooks/usePriceCalculator";

const CarsList = ({cars}) => {
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
