import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Footer from "./component/footer/Footer.jsx";
import CardVeh from "./component/reservation/component/Tomobiles/Card.jsx";
import NavBar from "./component/navbar/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FeatureBar from "./component/reservation/component/FeatureBar/FeatureBar.jsx";
import { useDispatch, useSelector } from "react-redux";
import MapsAndCard from "./component/reservation/component/MapsAndCard/MapsAndCard.jsx";
import Header from "./component/Home/Header/Header";
import Services from "./component/Home/Service/Services";
import About from "./component/Home/About/About";
import Info from "./component/Home/Info/Info";
import Cars from "./component/Home/Cars/Cars";
import Reviews from "./component/Home/Reviews/Reviews";
import CardAndSummary from "./component/reservation/component/CardsAndSummary/CardAndSummary.jsx";
import ExtraInfoPage from "./component/reservation/component/ExtraAndSummary/ExtraAndSummary.jsx";
import PaymentAndSummary from "./component/reservation/component/PaymentAndSummary/PaymentAndSummary.jsx";
import StepGuard from "./Guard/StepGuard.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box, CircularProgress } from "@mui/material";
import usePrice from "./component/reservation/component/Tomobiles/hooks/calculatePrice.jsx";
import { setStep4Data } from "./store/processSlice.js";
function App() {
 const { fetchAllprice, isLoading, error } = usePrice();
  const dispatch = useDispatch();

useEffect(() => {
  let isMounted = true;

  const getdata = async () => {
    try {
      const data = await fetchAllprice();
      if (data && isMounted) {
        dispatch(setStep4Data({ ...data }));
      }
    } catch (e) {
    }
  };

  getdata();

  return () => {
    isMounted = false;
  };
}, []);
 if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="60vh"
      >
        <p style={{ color: "red" }}>{error}</p>
      </Box>
    );
  }
  return (
    <>
      <Router>
        <NavBar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <ToastContainer position="top-center" autoClose={5000} />
                <Services />
                <About />
                <Info />
                <Cars />
                <Reviews />
                <Footer />
              </>
            }
          />{" "}
          <Route
            path="/car"
            element={
              <>
                <CardVeh />
                <Footer />
              </>
            }
          />
          <Route
            path="/map"
            element={
              <>
                <StepGuard requiredSteps={["step1Data"]}>
                  <MapsAndCard />
                </StepGuard>
                <Footer />
              </>
            }
          />
          <Route
            path="/Info"
            element={
              <>
                <StepGuard requiredSteps={["step1Data", "step2Data"]}>
                  <CardAndSummary />
                  <Footer />
                </StepGuard>
              </>
            }
          />
          <Route
            path="/Bar"
            element={
              <>
                <FeatureBar />
                <Footer />
              </>
            }
          />
          <Route
            path="/Extra"
            element={
              <>
                <StepGuard
                  requiredSteps={["step1Data", "step2Data", "step3Data"]}
                >
                  <ExtraInfoPage />
                  <Footer />
                </StepGuard>
              </>
            }
          />
          <Route
            path="/pay"
            element={
              <>
                <StepGuard
                  requiredSteps={[
                    "step1Data",
                    "step2Data",
                    "step3Data",
                    "step4Data",
                  ]}
                >
                  <PaymentAndSummary />
                  <Footer />
                </StepGuard>
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
