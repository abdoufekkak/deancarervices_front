import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useLocation } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setStep1Data } from "../../../../store/processSlice";
import "./GoogleMaps.css";

const containerStyle = {
  width: "50%",
  height: "450px",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const GoogleMaps = () => {
  const location = useLocation();
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [animatedPosition, setAnimatedPosition] = useState(null);
  const [shouldRequestDirection, setShouldRequestDirection] = useState(false);
  const [distance, setDistance] = useState("");
  const animationRef = useRef(null);
  const dispatch = useDispatch();
  const currentStep1Data = useSelector((state) => state.process.step1Data);
  const [mapLoading, setMapLoading] = useState(true);

  const geocoder = useRef(null);
  const isLargeScreen = useMediaQuery("(min-width:1280px)");
  // Animate marker
  const animateMarker = (path) => {
    if (!path || path.length === 0) return;
    let i = 0;
    const step = () => {
      if (i < path.length) {
        setAnimatedPosition({
          lat: path[i].lat(),
          lng: path[i].lng(),
        });
        i++;
        animationRef.current = setTimeout(step, 60);
      }
    };
    step();
  };

  const handleDirections = (result, status) => {
    if (status === "OK") {
      setDirectionsResponse(result);
      const overviewPath = result.routes[0].overview_path;
      const routeLeg = result.routes[0].legs[0];
      setDistance(routeLeg.distance.text);
      const duration = routeLeg.duration.text;
      dispatch(
        setStep1Data({
          ...currentStep1Data,
          distance: routeLeg.distance.text,
          duration, // ajoutez la durée ici
        })
      );
      if (animationRef.current) clearTimeout(animationRef.current);
      animateMarker(overviewPath);
    } else {
      alert("Itinerary not found. Check your points.");
      console.error("Directions request failed due to", status);
    }
    setShouldRequestDirection(false);
  };

  useEffect(() => {
    if (location.state && window.google) {
      const { from, to } = location.state;
      geocoder.current = new window.google.maps.Geocoder();

      geocoder.current.geocode({ address: from }, (results, status) => {
        if (status === "OK") {
          setOrigin(results[0].geometry.location);
        } else {
          alert("Invalid origin address");
        }
      });

      geocoder.current.geocode({ address: to }, (results, status) => {
        if (status === "OK") {
          setDestination(results[0].geometry.location);
          setShouldRequestDirection(true);
        } else {
          alert("Invalid destination address");
        }
      });
    }
  }, [location]);

  return (
    <Box sx={{ backgroundColor: "#f5f7fa" }}>
      {/* Left: Map + Distance + TransferCard */}

      <Box className="map-section">
        <Box className="map-left">
          <Box className="map-card" sx={{ backgroundColor: "#f5f7fa" }}>
            {origin && destination && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                mapContainerClassName="google-map-container"
                center={origin}
                zoom={10}
                onLoad={() => setMapLoading(false)}
                options={{
                  disableDefaultUI: true,
                  gestureHandling: "none",
                }}
              >
                <Marker position={origin} label="A" />
                <Marker position={destination} label="B" />

                {shouldRequestDirection && (
                  <DirectionsService
                    options={{
                      origin,
                      destination,
                      travelMode: "DRIVING",
                    }}
                    callback={handleDirections}
                  />
                )}

                {directionsResponse && (
                  <DirectionsRenderer directions={directionsResponse} />
                )}

                {animatedPosition && (
                  <Marker
                    position={animatedPosition}
                    icon={{
                      url: "https://maps.google.com/mapfiles/kml/shapes/cabs.png",
                      scaledSize: new window.google.maps.Size(40, 40),
                    }}
                  />
                )}
              </GoogleMap>
            )}
          </Box>
        </Box>
      </Box>
      {/* {distance && (
        <div
          style={{ marginTop: "10px", fontSize: "18px", fontWeight: "bold" }}
        >
          Distance: {distance}
        </div>
      )} */}
    </Box>
  );
};

export default GoogleMaps;
