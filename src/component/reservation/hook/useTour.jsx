// src/hooks/useCars.js
import { useState } from "react";
import axios from "axios";
import http from "../../../utils/httpService";
const useTour = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const addTour = async (data) => {
    try {
      const response = await axios.post(`${http.apiBaseUrl}tours`, data);
      return response.data;
    } catch (err) {
      setError("Erreur lors de l ajout ");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, addTour };
};

export default useTour;
