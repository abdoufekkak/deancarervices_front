import React from "react";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/font-awesome.min.css";
import slider_bg from "../../../assets/slider-bg.jpg";
import BookingForm from "../../reservation/component/Form/BookingForm.jsx";

function Header() {
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
