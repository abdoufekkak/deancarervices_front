import React from "react";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/font-awesome.min.css";
import img1 from "../../../assets/img1.jpg";

function About() {
  return (
    <section class="about_section layout_padding-bottom">
      <div class="container  ">
        <div class="row">
          <div class="col-md-6">
            <div class="detail-box">
              <div class="heading_container">
                <h2>
                  About <span>Us</span>
                </h2>
              </div>
              <p>
                At Dean , we believe that comfort and reliability go hand in
                hand. Our transport services are designed to offer smooth, safe,
                and enjoyable rides across the city. With well-maintained
                vehicles and professional drivers, we ensure that every journey
                you take with us feels effortless and relaxed—whether you're
                commuting daily or heading out on a special trip.
              </p>

              <a href="">Read More</a>
            </div>
          </div>
          <div class="col-md-6 ">
            <div class="img-box">
              <img src={img1} alt="example" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
