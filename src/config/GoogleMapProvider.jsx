import { useJsApiLoader } from "@react-google-maps/api";
import { CircularProgress, Box } from "@mui/material";

const libraries = ["places"];

const GoogleMapProvider = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
};

export default GoogleMapProvider;
