import { setStep4Data } from "../../../../../store/processSlice";
import axios from "axios";

const fetchStep4Data = () => async (dispatch) => {
  try {
    const [pricesRes, dayWeightsRes] = await Promise.all([
      axios.get("http://localhost:5000/api/prices"),
      axios.get("http://localhost:5000/api/dayweights"),
    ]);

    console.log("✅ Fetched prices:", pricesRes.data);
    console.log("✅ Fetched dayWeights:", dayWeightsRes.data);

    dispatch(
      setStep4Data({
        prices: pricesRes.data,
        dayWeights: dayWeightsRes.data,
      })
    );
  } catch (error) {
    console.error("❌ Erreur lors du chargement des données Step 4 :", error);
  }
};

export default fetchStep4Data;
