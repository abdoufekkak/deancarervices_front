import React, { useRef, useEffect, useState } from "react";
import {
  TextField,
  InputAdornment,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import { LocationOn } from "@mui/icons-material";

function GooglePlacesAutocomplete({ label, value, onChange, error, helperText }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    // Définir les limites géographiques de la Floride
    const floridaBounds = new window.google.maps.LatLngBounds(
      { lat: 24.396308, lng: -87.634896 }, // South West
      { lat: 31.000968, lng: -80.031362 }  // North East
    );

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      componentRestrictions: { country: "us" }, // Limiter aux USA
      bounds: floridaBounds, // Limiter à la Floride
      strictBounds: true,    // Ne montrer que les résultats dans la limite
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();

      // Vérifier si le lieu est dans la Floride
      const isInFlorida = place?.address_components?.some((component) =>
        component.short_name === "FL" || component.long_name === "Florida"
      );

      if (place.geometry && isInFlorida) {
        setIsValid(true);
        onChange(place.formatted_address || inputRef.current.value);
      } else {
        setIsValid(false);
      }

      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    onChange(e.target.value);
    setLoading(true);
    setIsValid(true);
    setTimeout(() => setLoading(false), 1000);
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
        helperText={!isValid ? "Adresse invalide, veuillez choisir une adresse en Floride." : helperText}
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

      {!isValid && (
        <FormHelperText error>
          {helperText || "Veuillez choisir une adresse située en Floride."}
        </FormHelperText>
      )}
    </>
  );
}

export default GooglePlacesAutocomplete;
