import axios from "axios";
import http from "../../../../../utils/httpService";
const usePrice = () => {
  const fetchAllprice = async () => {
    try {
      const pricesRes = await axios.get(`${http.apiBaseUrl}prices`);
      const dayWeightsRes = await axios.get(`${http.apiBaseUrl}dayweights`);
      const hourlyRateRes = await axios.get(`${http.apiBaseUrl}hourlyRate`);

      return {
        prices: pricesRes.data,
        dayWeights: dayWeightsRes.data,
        hourlyRates: hourlyRateRes.data,
      };
    } catch (error) {
    }
  };

  return { fetchAllprice };
};

export default usePrice;
