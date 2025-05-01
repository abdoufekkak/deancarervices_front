import {
  Box,
  Card,
  CardContent,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import {
  RadioButtonChecked,
  CalendarMonth,
  AccessTime,
  People,
  Route,
  AvTimer,
  CompareArrows,
} from "@mui/icons-material";

function DeanSummary() {
  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: 3,
        p: 2,
        maxWidth: 350,
        mx: "auto",
        mt: 2,
        backgroundColor: "white",
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Your transfer
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Outward Journey */}
        <Box display="flex" alignItems="center" mb={1}>
          <RadioButtonChecked
            fontSize="small"
            sx={{ color: "grey.600", mr: 1 }}
          />
          <Typography variant="body1" fontWeight="medium">
            Outward journey
          </Typography>
        </Box>

        {/* Route Info */}
        <Box ml={3} mb={2}>
          <Typography variant="subtitle1" fontWeight="bold">
            New York JFK Airport (JFK)
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={1}>
            New York, United States
          </Typography>

          <Box
            sx={{
              borderLeft: "2px dashed grey",
              height: 20,
              ml: "7px",
              mb: 1,
            }}
          ></Box>

          <Typography variant="subtitle1" fontWeight="bold">
            Hotel Edison
          </Typography>
          <Typography variant="body2" color="text.secondary">
            West 47th Street, New York, NY, USA
          </Typography>
        </Box>

        {/* Date and Time */}
        <Box display="flex" alignItems="center" mb={1}>
          <CalendarMonth sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">28 April 2025</Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={2}>
          <AccessTime sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">13:40 (1:40 pm)</Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Add Return Button */}
        <Typography
          variant="caption"
          display="block"
          textAlign="center"
          color="text.secondary"
          mb={1}
        >
          Book smart! Add a return journey
        </Typography>

        <Button
          variant="contained"
          fullWidth
          startIcon={<CompareArrows />}
          sx={{
            background: "linear-gradient(to right, #FFA726, #FB8C00)",
            color: "white",
            fontWeight: "bold",
            mb: 2,
          }}
        >
          ADD A RETURN
        </Button>

        <Divider sx={{ mb: 2 }} />

        {/* Additional Info */}
        <Box display="flex" alignItems="center" mb={1}>
          <People sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">1 PASSENGER</Typography>
        </Box>

        <Box display="flex" alignItems="center" mb={1}>
          <Route sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">27 km / 17 miles</Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <AvTimer sx={{ color: "grey.700", mr: 1 }} />
          <Typography variant="body2">0h 41m</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default DeanSummary;
