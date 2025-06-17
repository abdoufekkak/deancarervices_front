import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import useCars from "./hooks/useCare";
import CarCard from "./Car";

const CarsList = () => {
  const { isLoading, error, fetchCars } = useCars();
  const [cars, setCars] = useState([]);
<<<<<<< Updated upstream
  const [selectedCarId, setSelectedCarId] = useState(null); // <- Ajout ici

  useEffect(() => {
    fetchCars()
      .then((cars) => {
        // console.log(cars);
        setCars(cars);
=======
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
>>>>>>> Stashed changes
      })
      .catch((e) => {
        console.error("Erreur :", e);
      });
<<<<<<< Updated upstream
  }, [fetchCars]);
=======
  }, [step1, step4]);
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          isSelected={selectedCarId === car.id} // <- on vérifie si c’est sélectionné
          onSelect={() => setSelectedCarId(car.id)} // <- callback pour sélectionner
        />
      ))}
=======
      {cars &&
        cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            price={car.price}
            isSelected={selectedCarId === car.id}
            onSelect={() => setSelectedCarId(car.id)}
          />
        ))}
>>>>>>> Stashed changes
    </Box>
  );
};

export default CarsList;
