import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Footer from "./component/footer/Footer.jsx";
import BookingForm from "./component/reservation/Form/BookingForm.jsx";
import CardVeh from "./component/reservation/Tomobiles/Card.jsx";
import NavBar from "./component/navbar/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DeanSummary from "./summary/Summary.jsx";
import HelpCenter from "./component/CardHelp/HelpCenter.jsx";
import CardInfo from "./component/CardInfo/CardInfo.jsx";
import Steps from "./Steps/Steps.jsx";
import FeatureBar from "./component/FeatureBar/FeatureBar.jsx";
import ExtraInfo from "./component/FeatureBar/ExtraInfo/ExtraInfo.jsx";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapPage from "./component/reservation/GoogleMaps/googleMapPage.jsx";
import MapsAndCard from "./component/reservation/MapsAndCard/MapsAndCard.jsx";
function App() {
  const dispatch=   useDispatch();
  // const  navigate=useNavigate();

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
              {/* <App /> */}
              <CardVeh />
              <Footer />
            </>
          }
        />
        <Route
          path="/form"
          element={
            <>
              <BookingForm />
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
          path="/summary"
          element={
            <>
              <DeanSummary />
              <Footer />
            </>
          }
        />{" "}
        <Route
          path="/Info"
          element={
            <>
              <CardInfo />
              <Footer />
            </>
          }
        />
        <Route
          path="/Step"
          element={
            <>
              <Steps />
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
          path="/Infos"
          element={
            <>
              <ExtraInfo />
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
