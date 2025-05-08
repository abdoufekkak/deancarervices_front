// src/components/CarsList.js
import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import useCars from "./hooks/useCare";
import CarCard from "./Car";

const CarsList = () => {
  const { isLoading, error, fetchCars } = useCars();
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetchCars()
      .then((cars) =>{
        console.log(cars)
        setCars(cars)
      } )
      .catch((e) => {
        console.log(e,"ok")
        console.log(e)});
  }, [fetchCars]);
 

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </Box>
  );
};

export default CarsList;
