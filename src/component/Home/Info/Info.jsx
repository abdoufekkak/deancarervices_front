import React from "react";
import "../css/bootstrap.css";
import "../css/responsive.css";
import "../css/style.css";
import "../css/font-awesome.min.css";
import img from "../../../assets/about-img.jpg";

function Info() {
  return (
    <section className="chauffeur-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Image First on mobile, Second on desktop */}
          <div className="col-md-6 mb-4 mb-md-0 order-1 order-md-2">
            <div className="chauffeur-content">
              <h4 className="text-uppercase text-muted">
                Your Personal Chauffeur, At Your Fingertips
              </h4>
              <h2 className="fw-bold">Hourly Service</h2>

              <p>
                Book your personal chauffeur by the hour and experience the
                freedom to travel on your terms. Whether you have multiple
                appointments, a day of shopping, important meetings, or a
                special event, our premium service adapts entirely to your needs
                and schedule.
              </p>
              <p>
                Count on a smooth, professional, and dependable ride every time.
                With the flexibility to change plans on the go, your dedicated
                chauffeur will be there when you need them—letting you focus on
                what truly matters.
              </p>

              <div className="d-flex flex-wrap gap-4 mt-4 chauffeur-stats">
                <div>
                  <p className="stat-number fw-bold mb-0">76+</p>
                  <p>Countries</p>
                </div>
                <div>
                  <p className="stat-number fw-bold mb-0">2100+</p>
                  <p>Cities</p>
                </div>
                <div>
                  <p className="stat-number fw-bold mb-0">650+</p>
                  <p>Airports</p>
                </div>
                <div>
                  <p className="stat-number fw-bold mb-0">∞</p>
                  <p>Routes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Second on mobile, First on desktop */}
          <div className="col-md-6 order-2 order-md-1">
            <div className="chauffeur text-center">
              <img src={img} alt="example" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Info;
