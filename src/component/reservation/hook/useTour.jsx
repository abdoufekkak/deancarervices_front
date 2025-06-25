// src/hooks/useCars.js
import { useState } from "react";
import axios from "axios";
import http from "../../../utils/httpService";
const useTour = () => {
  const [isLoadingToor, setIsLoadingToor] = useState(false);
  const [errorToor, setRerrorToor] = useState(null);

  const addTour = async (data) => {
    try {
      setRerrorToor("");
      setIsLoadingToor(true);
      const response = await axios.post(`${http.apiBaseUrl}tours`, data);
      return response.data;
    } catch (err) {
      setRerrorToor("Erreur lors de l ajout ");
      return null;
    } finally {
      setIsLoadingToor(false);
    }
  };

  return { isLoadingToor, errorToor, addTour };
};

export default useTour;
