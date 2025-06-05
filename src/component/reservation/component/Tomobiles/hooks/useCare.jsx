// src/hooks/useCars.js
import { useState } from "react";
import axios from "axios"; // Assure-toi d'avoir installé axios avec npm ou yarn
import http from "../../../../../utils/httpService";
const useCars = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fonction fetchCars à l'intérieur du hook
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${http.apiBaseUrl}voitures/notAllowed`);
      return response.data;
    } catch (err) {
      setError("Erreur lors de la récupération des voitures");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, fetchCars };
};

export default useCars;
