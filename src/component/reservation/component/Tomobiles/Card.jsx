import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import useCars from "./hooks/useCare";
import CarCard from "./Car";

const CarsList = () => {
  const { isLoading, error, fetchCars } = useCars();
  const [cars, setCars] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState(null); // <- Ajout ici

  useEffect(() => {
    fetchCars()
      .then((cars) => {
        // console.log(cars);
        setCars(cars);
      })
      .catch((e) => {
        console.error("Erreur :", e);
      });
  }, [fetchCars]);

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
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isSelected={selectedCarId === car.id} // <- on vérifie si c’est sélectionné
          onSelect={() => setSelectedCarId(car.id)} // <- callback pour sélectionner
        />
      ))}
    </Box>
  );
};

export default CarsList;
