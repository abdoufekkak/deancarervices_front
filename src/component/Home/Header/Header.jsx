import React, { useEffect, useState } from "react";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/font-awesome.min.css";
import slider_bg from "../../../assets/slider-bg.jpg";
import BookingForm from "../../reservation/component/Form/BookingForm.jsx";
import ByHourCard from "../../reservation/component/Form/ByHourCard.jsx";
import usePrice from "../../reservation/component/Tomobiles/hooks/calculatePrice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setStep4Data } from "../../../store/processSlice.js";
import { Box, CircularProgress } from "@mui/material";

function Header() {
  const [loading, setLoading] = useState(true);
  const { fetchAllprice } = usePrice();
  const dispatch = useDispatch(); // en haut de ton composant

  useEffect(() => {
    setLoading(true);
    fetchAllprice()
      .then((data) => {
        console.log("✅ Données reçues:", data);
        dispatch(setStep4Data({ ...data })); // ✅ Voilà la bonne utilisation
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
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
  return (
    <section className="slider_section">
      <div className="slider_bg_box">
        <img src={slider_bg} alt="Background" />
      </div>

      <div className="header-content">
        <div className="header-text">
          {/* your existing header content like h1, p, etc. */}
          <h1>
            We Provide best <br />
            Transport Service
          </h1>
          <p>
            Experience reliable and comfortable travel solutions tailored to
            your needs. Our top-notch transport services ensure every journey is
            smooth and stress-free.
          </p>
        </div>

        <div className="header-form">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

export default Header;
