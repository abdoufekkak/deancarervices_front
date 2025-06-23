import { useState } from "react";
import axios from "axios";
import http from "../../../../../utils/httpService";

const usePrice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllprice = async () => {
    setIsLoading(true);
    setError(null);

    try {
  const     pricesRes= await       axios.get(`${http.apiBaseUrl}prices`);
const   dayWeightsRes =await        axios.get(`${http.apiBaseUrl}dayweights`);
const   hourlyRateRes = await axios.get(`${http.apiBaseUrl}hourlyRate`)

      return {
        prices: pricesRes.data,
        dayWeights: dayWeightsRes.data,
        hourlyRates: hourlyRateRes.data,
      };
    } catch (err) {
     setError("Something went wrong. Please try again.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchAllprice, isLoading, error };
};

export default usePrice;
