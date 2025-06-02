// src/hooks/useCars.js
import { useState } from "react";
import axios from "axios";

const useTour = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const addTour = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tours",
        data
      );
      return response.data;
    } catch (err) {
      setError("Erreur lors de la récupération des voitures");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, addTour };
};

export default useTour;
