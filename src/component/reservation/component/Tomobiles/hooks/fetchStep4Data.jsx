import { setStep4Data } from "../../../../../store/processSlice";
import axios from "axios";

const fetchStep4Data = () => async (dispatch) => {
  try {
    const pricesRes = await axios.get("http://localhost:5000/api/prices");
    const dayWeightsRes = await axios.get(
      "http://localhost:5000/api/dayweights"
    );
    const hourlyRateRes = await axios.get(
      "http://localhost:5000/api/hourlyRate"
    );
    // console.log("rate", hourlyRateRes);
    dispatch(
      setStep4Data({
        prices: pricesRes.data,
        dayWeights: dayWeightsRes.data,
        hourlyRates: hourlyRateRes.data,
      })
    );
  } catch (error) {
    console.error("Erreur lors du chargement des données Step 4 :", error);
  }
};

export default fetchStep4Data;
