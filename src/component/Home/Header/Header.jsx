import React, { useEffect, useState } from "react";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/font-awesome.min.css";
import imgg from "../../../assets/imgg.jpg";
import BookingForm from "../../reservation/component/Form/BookingForm.jsx";
import usePrice from "../../reservation/component/Tomobiles/hooks/calculatePrice.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setStep4Data } from "../../../store/processSlice.js";
import { Box, CircularProgress } from "@mui/material";
import { motion } from "framer-motion";


function Header() {
 
 
return (
    <motion.section 
      className="slider_section"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="slider_bg_box">
        <img src={imgg} alt="Background" />
      </div>

      <div className="header-content">
        <div className="header-text">
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
    </motion.section>
  );
}


export default Header;
