import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";



const StepGuard = ({
  requiredSteps = [],
  redirectTo = "/",
  children,
}) => {
  const process = useSelector((state ) => state.process);
  const navigate = useNavigate();
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const isMissingRequiredStep = requiredSteps.some(
      (step) => !process[step] || Object.keys(process[step]).length === 0
    );

    if (isMissingRequiredStep) {
      navigate(redirectTo);
    } else {
      setIsAllowed(true);
    }
  }, [requiredSteps, process, navigate, redirectTo]);

  if (!isAllowed) return null; // ou un loader si tu veux

  return <>{children}</>;
};

export default StepGuard;
