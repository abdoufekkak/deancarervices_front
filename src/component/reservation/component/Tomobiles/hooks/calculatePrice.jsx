import axios from "axios";

const usePrice = () => {
 const fetchAllprice=async()=>{
 try {
    const pricesRes = await axios.get("http://localhost:5000/api/prices");
    const dayWeightsRes = await axios.get(
      "http://localhost:5000/api/dayweights"
    );
    const hourlyRateRes = await axios.get(
      "http://localhost:5000/api/hourlyRate"
    );
   
    return { prices: pricesRes.data,
        dayWeights: dayWeightsRes.data,
        hourlyRates: hourlyRateRes.data,}
  } catch (error) {
    console.error("Erreur lors du chargement des données Step 4 :", error);
  }
 
   
  }

  return {fetchAllprice};
};

export default usePrice;
