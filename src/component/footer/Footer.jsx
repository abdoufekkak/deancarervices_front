import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import {
  Facebook,
  Instagram,
  Commute as CommuteIcon,
} from "@mui/icons-material";
import "./Footer.css";

function Footer() {
  const sections = [
    {
      title: "America - 24/7",
      items: [
        "🇺🇸 US EAST: +1 929 416 3724",
        "🇺🇸 US WEST: +1 562 269 3528",
        "🇨🇦 CANADA: +1 365 654 6440",
      ],
    },
    {
      title: "Oceania - 24/7",
      items: ["🇦🇺 AUSTRALIA: +61 1300 297 730"],
    },
    {
      title: "Europe - 24/7",
      items: ["🇬🇧 UK: +44 20 4586 9665", "🇮🇹 ITALY: +39 06 9450 5426"],
    },
    {
      title: "General Info",
      items: ["info@Dean.com"],
    },
  ];

  const airports = [
    "London Heathrow Airport",
    "Rome Airport",
    "Barcelona Airport",
    "Paris Airport",
    "New York JFK Airport",
    "Dubai Airport",
    "Lisbon Airport",
    "Los Angeles Airport",
    "Milan Malpensa Airport",
    "Amsterdam Airport",
  ];

  const services = [
    "Airport Transfers",
    "City rides",
    "Hourly Service",
    "Business Solutions",
    "Help Centre",
    "Travel Blog",
    "oneMILE",
  ];

  const company = [
    "Terms & Conditions",
    "Webmasters or influencer?",
    "For Travel Agencies",
    "Become a Partner Driver",
    "Partner/Driver login",
    "Your Privacy Choices",
  ];

  const whyUs = ["✓ No Hidden Costs", "✓ 24/7 Support", "✓ Secure Rides"];

  return (
    <Box className="footer">
      {/* Header with icon and brand */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 4, ml: 10 }}>
        <CommuteIcon sx={{ fontSize: 40, color: "#0a97b0", mr: 0 }} />
        <Typography
          sx={{
            fontFamily: "Orbitron, sans-serif",
            fontWeight: 700,
            fontSize: "2rem",
            color: "#ffffff",
          }}
        >
          Dean
        </Typography>
      </Box>

      <Grid container sx={{ ml: 1, mr: 30 }} spacing={8}>
        {/* Contact Section */}
        <Grid item xs={12} sm={6} md={3}>
          {sections.map((section, idx) => (
            <Box key={idx} mb={2}>
              <Typography className="footer-title">{section.title}</Typography>
              {section.items.map((item, i) => (
                <Typography key={i} className="footer-item">
                  {item}
                </Typography>
              ))}
            </Box>
          ))}
        </Grid>

        {/* Airports Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography className="footer-title">Top Airports</Typography>
          {airports.map((airport, idx) => (
            <Typography key={idx} className="footer-item">
              {airport}
            </Typography>
          ))}
        </Grid>

        {/* Services + Company */}
        <Grid item xs={12} sm={6} md={3}>
          <Box mb={2}>
            <Typography className="footer-title">Dean Services</Typography>
            {services.map((srv, idx) => (
              <Typography key={idx} className="footer-item">
                {srv}
              </Typography>
            ))}
          </Box>
          <Box>
            <Typography className="footer-title">Company</Typography>
            {company.map((item, idx) => (
              <Typography key={idx} className="footer-item">
                {item}
              </Typography>
            ))}
          </Box>
        </Grid>

        {/* Why Us + Icons */}
        <Grid item xs={12} sm={6} md={3}>
          <Box mb={2}>
            <Typography className="footer-title">Why Us?</Typography>
            {whyUs.map((point, idx) => (
              <Typography key={idx} className="footer-item">
                {point}
              </Typography>
            ))}
          </Box>
          <Box className="footer-icons">
            <Facebook />
            <Instagram />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Footer;
