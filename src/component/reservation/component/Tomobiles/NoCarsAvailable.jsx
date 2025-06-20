import { Box, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export default function NoCarsAvailable() {
  return (
    <Box textAlign="center" py={5}>
      <DirectionsCarIcon style={{ fontSize: 50, color: "#bbb" }} />
      <Typography variant="h6" mt={2}>
        No vehicles available at the moment.
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Please try again later or consider adding new vehicles .
      </Typography>
    </Box>
  );
}
