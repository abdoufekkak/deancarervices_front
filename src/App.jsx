import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Footer from "./component/footer/Footer.jsx";
import CardVeh from "./component/reservation/component/Tomobiles/Card.jsx";
import NavBar from "./component/navbar/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DeanSummary from "./summary/Summary.jsx";
import HelpCenter from "./component/CardHelp/HelpCenter.jsx";
import CardInfo from "./component/reservation/component/CardInfo/CardInfo.jsx";
import Steps from "./Steps/Steps.jsx";
import FeatureBar from "./component/reservation/component/FeatureBar/FeatureBar.jsx";
import ExtraInfo from "./component/reservation/component/FeatureBar/ExtraInfo/ExtraInfo.jsx";
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
<<<<<<< Updated upstream
=======
import PaymentAndSummary from "./component/reservation/component/PaymentAndSummary/PaymentAndSummary.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

>>>>>>> Stashed changes
function App() {
  const step1Data = useSelector((state) => state.process.step1Data);
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
                <MapsAndCard />
                <Footer />
              </>
            }
          />
          <Route
            path="/Info"
            element={
              <>
                <CardAndSummary />
                <Footer />
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
                <ExtraInfoPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/help"
            element={
              <>
                <HelpCenter />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
