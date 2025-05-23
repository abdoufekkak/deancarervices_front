import { useSelector } from "react-redux";
import { useMemo } from "react";

function usePriceCalculator(car) {
  const step1 = useSelector((state) => state.process.step1Data);
  const step4 = useSelector((state) => state.process.step4Data);

  const calculatePrice = useMemo(() => {
    const checks = {
      hasPickupDate: !!step1?.pickupDate,
      hasPickupTime: !!step1?.pickupTime,
      hasDistance: !!step1?.distance,
      hasCarPrix: !!car?.prix,
      hasPrices: Array.isArray(step4?.prices) && step4.prices.length > 0,
      hasDayWeights:
        Array.isArray(step4?.dayWeights) && step4.dayWeights.length > 0,
    };

    const allValid = Object.values(checks).every(Boolean);
    if (!allValid) return null;

    const distance = parseFloat(step1.distance);
    const prixVoiture = parseFloat(car.prix);

    const computeSegment = (dateStr, timeStr) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      const [hourStr] = timeStr.split(":");
      const hour = parseInt(hourStr, 10);
      const dateObj = new Date(year, month - 1, day);
      const dayOfWeek = dateObj.getDay();
      const dayType = [0, 6].includes(dayOfWeek) ? "weekend" : "week";

      const priceObj = step4.prices.find((p) => {
        const startHour = parseInt(p.heureDebut.split(":")[0], 10);
        const endHour = parseInt(p.heureFin.split(":")[0], 10);
        return startHour < endHour
          ? hour >= startHour && hour < endHour
          : hour >= startHour || hour < endHour;
      });

      if (!priceObj) return null;

      const dayWeightObj = step4.dayWeights.find(
        (dw) => dw.type_jour === dayType
      );

      const prixBase = parseFloat(priceObj.prix);
      const poids = parseFloat(dayWeightObj?.poids ?? 1);

      return prixBase * distance * poids * prixVoiture;
    };

    const aller = computeSegment(step1.pickupDate, step1.pickupTime);
    if (aller == null) return null;

    let retour = 0;
    if (step1.returnDate && step1.returnTime) {
      const retourCalc = computeSegment(step1.returnDate, step1.returnTime);
      if (retourCalc != null) retour = retourCalc;
    }

    return {
      total: (aller + retour).toFixed(2),
      aller: aller.toFixed(2),
      retour: retour > 0 ? retour.toFixed(2) : null,
    };
  }, [step1, step4, car]);

  return calculatePrice;
}

export default usePriceCalculator;
