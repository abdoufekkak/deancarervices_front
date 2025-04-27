import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Footer from "./footer/Footer.jsx";
import BookingForm from "./Form/BookingForm.jsx";
import CardVeh from "./Card/Card.jsx";
import NavBar from "./navbar/Navbar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DeanSummary from "./summary/Summary.jsx";
import HelpCenter from "./CardHelp/HelpCenter.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <App />
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
          path="/summary"
          element={
            <>
              <DeanSummary />
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
  </StrictMode>
);
