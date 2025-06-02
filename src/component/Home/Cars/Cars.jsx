import React from "react";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/font-awesome.min.css";
import img3 from "../../../assets/img3.jpg";
import img2 from "../../../assets/img2.jpg";
import img4 from "../../../assets/img4.jpg";
import img5 from "../../../assets/img5.jpg";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
function Cars() {
  return (
    <div class="bg-light">
      <div class="container py-5">
        <div class="row g-4">
          <div class="col-md-4 col-lg-3">
            <div class="card car-card p-3 text-center">
              <img src={img5} alt="example" />
              <h5 class="mt-3">Standard</h5>
              <div class="d-flex justify-content-center gap-3 my-2">
                <div
                  className="icon-text"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <PeopleIcon fontSize="small" />
                  <span>3</span>
                </div>
                <div
                  className="icon-text"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <WorkIcon fontSize="small" />
                  <span>3</span>
                </div>
              </div>
              <small class="text-muted">
                Ideal for small groups and light luggage
              </small>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="card car-card p-3 text-center">
              <img src={img2} alt="example" />
              <h5 class="mt-3">First class</h5>
              <div class="d-flex justify-content-center gap-3 my-2">
                <div
                  className="icon-text"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <PeopleIcon fontSize="small" />
                  <span>3</span>
                </div>
                <div
                  className="icon-text"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <WorkIcon fontSize="small" />
                  <span>3</span>
                </div>
              </div>
              <small class="text-muted">
                Enjoy premium comfort with soft seats and a smooth ride
              </small>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="card car-card p-3 text-center">
              <img src={img3} alt="example" />
              <h5 class="mt-3">SUV</h5>
              <div class="d-flex justify-content-center gap-3 my-2">
                <div
                  className="icon-text"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <PeopleIcon fontSize="small" />
                  <span>6</span>
                </div>
                <div
                  className="icon-text"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <WorkIcon fontSize="small" />
                  <span>6</span>
                </div>
              </div>
              <small class="text-muted">
                A spacious SUV offering plenty of room for passengers and
                luggage
              </small>
            </div>
          </div>
          <div class="col-md-4 col-lg-3">
            <div class="card car-card p-3 text-center">
              <img src={img4} alt="example" />

              <h5 class="mt-3">First class SUV</h5>
              <div class="d-flex justify-content-center gap-3 my-2">
                <div
                  className="icon-text"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <PeopleIcon fontSize="small" />
                  <span>6</span>
                </div>
                <div
                  className="icon-text"
                  style={{ display: "flex", alignItems: "center", gap: 4 }}
                >
                  <WorkIcon fontSize="small" />
                  <span>6</span>
                </div>
              </div>
              <small class="text-muted">
                Experience luxury in an SUV with elegant design and advanced
                features
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Cars;
