// src/hooks/useCars.js
import { useEffect, useState } from "react";
import axios from "axios";
import http from "../../../../../utils/httpService";

const useCars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${http.apiBaseUrl}voitures/notAllowed`);
      setCars(response.data || []);
      setError(null);
    } catch (err) {
      console.error("Erreur lors de la récupération des voitures :", err);
      setError("Erreur lors de la récupération des voitures");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return { cars, isLoading, error, fetchCars };
};

export default useCars;
