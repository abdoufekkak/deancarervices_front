import React from "react";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/font-awesome.min.css";
function Services() {
  return (
    <section class="features">
      <div class="feature">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12a9 9 0 1 0-18 0 9 9 0 0 0 18 0z"></path>
            <path d="M2 12h20"></path>
            <path d="M12 2a15.3 15.3 0 0 1 0 20"></path>
          </svg>
        </div>
        <h3>Global</h3>
        <p>
          Wherever your journey leads, Dean ensures your comfort along the way.
        </p>
        <a href="#">Learn more ➔</a>
      </div>

      <div class="feature">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M5.5 21h13a1.5 1.5 0 0 0 1.5-1.5v-2a6.5 6.5 0 0 0-13 0v2A1.5 1.5 0 0 0 5.5 21z"></path>
          </svg>
        </div>
        <h3>Professional drivers</h3>
        <p>Professional Drivers, Timely Rides, Relaxed Travel</p>
        <a href="#">Learn more ➔</a>
      </div>

      <div class="feature">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
        </div>
        <h3>Chauffeur by the hour</h3>
        <p>Hire an hourly chauffeur for your business or leisure needs.</p>
        <a href="#">Learn more ➔</a>
      </div>

      <div class="feature">
        <div class="icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#111"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="17 1 21 5 17 9"></polyline>
            <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
            <polyline points="7 23 3 19 7 15"></polyline>
            <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
          </svg>
        </div>
        <h3>City rides</h3>
        <p>Explore the city anytime, anywhere—even long distances.</p>
        <a href="#">Learn more ➔</a>
      </div>
    </section>
  );
}
export default Services;
