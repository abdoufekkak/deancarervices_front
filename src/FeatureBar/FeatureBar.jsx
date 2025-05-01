import React, { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightIcon from "@mui/icons-material/Flight";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import "./FeatureBar.css"; // CSS file

function FeatureBar() {
  const features = [
    {
      icon: <AccessTimeIcon className="feature-icon" />,
      title: "Free cancellation",
      subtitle: "up to 24 hours before pickup",
    },
    {
      icon: <FlightIcon className="feature-icon" />,
      title: "Flight tracking",
      subtitle: "Driver will monitor your flight",
    },
    {
      icon: <EmojiTransportationIcon className="feature-icon" />,
      title: "Licensed Chauffeurs",
      subtitle: "Maximum comfort and safety",
    },
    {
      icon: <HeadsetMicIcon className="feature-icon" />,
      title: "24/7 Support",
      subtitle: "Dedicated customer service",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % features.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const renderFeature = (feature, index) => (
    <Stack
      key={index}
      direction="row"
      alignItems="center"
      spacing={1}
      className="feature-item"
    >
      {feature.icon}
      <Stack>
        <Typography className="feature-title">{feature.title}</Typography>
        <Typography className="feature-subtitle">{feature.subtitle}</Typography>
      </Stack>
    </Stack>
  );

  return (
    <Box className="feature-bar">
      {isMobile
        ? renderFeature(features[currentIndex], currentIndex)
        : features.map(renderFeature)}
    </Box>
  );
}

export default FeatureBar;
