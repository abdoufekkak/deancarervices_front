import React, { useRef, useEffect, useState } from "react";
import { TextField, InputAdornment, CircularProgress, FormHelperText } from "@mui/material";
import { LocationOn } from "@mui/icons-material";

function GooglePlacesAutocomplete({ label, value, onChange, error, helperText }) {
  const inputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(true); // Track if the place is valid

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    autocompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["geocode"], // or ["(cities)"] for cities only
      componentRestrictions: { country: "ma" }, // e.g. limit to Morocco
    });

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry) {
        setIsValid(true); // If a valid place is selected
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
        helperText={!isValid ? "Invalid address, please select a valid suggestion" : helperText}
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
