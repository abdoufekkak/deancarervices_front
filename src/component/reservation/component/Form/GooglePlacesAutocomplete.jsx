import React, { useRef, useEffect, useState } from "react";
import { TextField, InputAdornment, CircularProgress, FormHelperText } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

function GooglePlacesAutocomplete({
  label,
  value,
  onChange,
  error,
  helperText,
}) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true); // Track if the place is valid

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

<<<<<<< Updated upstream
    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"], // or ["(cities)"] for cities only
      componentRestrictions: { country: "ma" }, // e.g. limit to Morocco
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry) {
        setIsValid(true); // If a valid place is selected
=======
    // Définir les limites géographiques de la Floride
    const floridaBounds = new window.google.maps.LatLngBounds(
      { lat: 24.396308, lng: -87.634896 }, // South West
      { lat: 31.000968, lng: -80.031362 } // North East
    );

    autocompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        componentRestrictions: { country: "us" },
        bounds: floridaBounds,
        strictBounds: true,
      }
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();

      // Vérifier si le lieu est dans la Floride
      const isInFlorida = place?.address_components?.some(
        (component) =>
          component.short_name === "FL" || component.long_name === "Florida"
      );

      if (place.geometry && isInFlorida) {
        setIsValid(true);
>>>>>>> Stashed changes
        onChange(place.formatted_address || inputRef.current.value);
      } else {
        setIsValid(false); // Invalid place
      }

      setLoading(false); // stop spinner
    });
  }, []);

  const handleChange = (e) => {
    onChange(e.target.value);
    setLoading(true);
    setIsValid(true); // Reset validation on new input
    setTimeout(() => setLoading(false), 1000); // Simulate delay
  };

  return (
    <>
      <TextField
        inputRef={inputRef}
        label={label}
        fullWidth
        value={value}
        onChange={handleChange}
        error={!isValid || error}
<<<<<<< Updated upstream
        helperText={!isValid ? "Invalid address, please select a valid suggestion" : helperText}
=======
        helperText={
          !isValid
            ? "Adresse invalide, veuillez choisir une adresse en Floride."
            : helperText
        }
>>>>>>> Stashed changes
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOn />
            </InputAdornment>
          ),
          endAdornment: loading && (
            <InputAdornment position="end">
              <CircularProgress size={20} />
            </InputAdornment>
          ),
        }}
      />

      {!isValid && <FormHelperText error>{helperText || "Please select a valid address from the suggestions."}</FormHelperText>}
    </>
  );
}

export default GooglePlacesAutocomplete;
