// src/hooks/useCars.js
import { useState } from "react";
import axios from "axios"; // Assure-toi d'avoir installé axios avec npm ou yarn
import http from "../../../utils/httpService";
const useReservation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fonction fetchCars à l'intérieur du hook
  const addReservation = async (data) => {
    try {
       setError("");
      setIsLoading(true)
      const response = await axios.post(`${http.apiBaseUrl}reservations`, data); // Remplace par l'URL de ton API
      return response.data; // Stocke les données des voitures dans le state
    } catch (err) {
      setError("Erreur lors de la récupération des voitures");
      return null
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, addReservation };
};

export default useReservation;
