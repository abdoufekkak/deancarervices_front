import React from "react";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/font-awesome.min.css";
import img3 from "../../../assets/img3.jpg";
import img2 from "../../../assets/img2.jpg";

function Cars() {
  return (
    <div class="bg-light">
      <div class="container py-5">
        <div class="row g-4">
          <div class="col-md-4 col-lg-3">
            <div class="card car-card p-3 text-center">
              <img src={img3} alt="example" />
              <h5 class="mt-3">Economy</h5>
              <div class="d-flex justify-content-center gap-3 my-2">
                <div class="icon-text">
                  <i class="bi bi-people"></i> 3
                </div>
                <div class="icon-text">
                  <i class="bi bi-luggage"></i> 3
                </div>
              </div>
              <small class="text-muted">
                Skoda Octavia, Toyota Prius or similar
              </small>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="card car-card p-3 text-center">
              <img src={img2} alt="example" />
              <h5 class="mt-3">Economy</h5>
              <div class="d-flex justify-content-center gap-3 my-2">
                <div class="icon-text">
                  <i class="bi bi-people"></i> 3
                </div>
                <div class="icon-text">
                  <i class="bi bi-luggage"></i> 3
                </div>
              </div>
              <small class="text-muted">
                Skoda Octavia, Toyota Prius or similar
              </small>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="card car-card p-3 text-center">
              <img src={img3} alt="example" />
              <h5 class="mt-3">Economy</h5>
              <div class="d-flex justify-content-center gap-3 my-2">
                <div class="icon-text">
                  <i class="bi bi-people"></i> 3
                </div>
                <div class="icon-text">
                  <i class="bi bi-luggage"></i> 3
                </div>
              </div>
              <small class="text-muted">
                Skoda Octavia, Toyota Prius or similar
              </small>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="card car-card p-3 text-center">
              <img src={img2} alt="example" />

              <h5 class="mt-3">Economy</h5>
              <div class="d-flex justify-content-center gap-3 my-2">
                <div class="icon-text">
                  <i class="bi bi-people"></i> 3
                </div>
                <div class="icon-text">
                  <i class="bi bi-luggage"></i> 3
                </div>
              </div>
              <small class="text-muted">
                Skoda Octavia, Toyota Prius or similar
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cars;
