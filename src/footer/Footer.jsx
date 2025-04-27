import React from "react";
import { Box, Container, Typography, Link } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        py: 2,
        px: 4,
        mt: 4,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} All Rights Reserved By Abdou&Salma
      </Typography>
    </Box>
  );
}

export default Footer;
