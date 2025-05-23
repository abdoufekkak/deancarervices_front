import React from "react";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/font-awesome.min.css";
function Reviews() {
  return (
    <div class="">
      {/* <button class="carousel-btn left" onclick="scrollCarousel(-1)">
        &#10094;
      </button> */}

      <div class="review-carousel" id="reviewCarousel">
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <h4>Easy to use!</h4>
          <p>Easy to use!</p>
          <div class="user-info">
            <strong>Shelley Mansell</strong>, 9 hours ago
          </div>
        </div>
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <h4>Exceptional experience</h4>
          <p>
            From the moment we landed, they contacted us by WhatsApp to inform
            us.
          </p>
          <div class="user-info">
            <strong>Hector Martin</strong>, 11 hours ago
          </div>
        </div>
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <h4>Arrived on time</h4>
          <p>Great service. Comfortable car with water. Will book again.</p>
          <div class="user-info">
            <strong>Lindsey E</strong>, 11 hours ago
          </div>
        </div>
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <h4>Everything perfect</h4>
          <p>Very comfortable and relaxed transfer. Very nice driver!</p>
          <div class="user-info">
            <strong>Ankica S.</strong>, 11 hours ago
          </div>
        </div>
        <div class="review-card">
          <div class="stars">★★★★★</div>
          <h4>Dubai to Abu Dhabi transfer</h4>
          <p>My driver was prompt and very friendly. The car was very clean.</p>
          <div class="user-info">
            <strong>Paul Hudson</strong>, 12 hours ago
          </div>
        </div>
      </div>

      {/* <button class="carousel-btn right" onclick="scrollCarousel(1)">
        &#10095;
      </button> */}
    </div>
  );
}
export default Reviews;
