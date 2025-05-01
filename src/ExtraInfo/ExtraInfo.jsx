import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  FormHelperText,
  Paper,
} from "@mui/material";
import { InfoOutlined, SmsOutlined } from "@mui/icons-material";
import "./ExtraInfo.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

function ExtraInfo() {
  return (
    <Card className="extra-info-card">
      <CardContent>
        <Typography variant="h6" className="section-title">
          <InfoOutlined className="section-icon" /> Lead passenger
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Name + Last Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Name"
              helperText=" "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <InfoOutlined fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Last Name"
              helperText=" "
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <InfoOutlined fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        {/* Email - Full Width */}
        <Grid item xs={6}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField
              fullWidth
              label="Email address"
              helperText="We'll send your booking voucher here."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <InfoOutlined fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" gutterBottom>
                Mobile phone number <InfoOutlined fontSize="small" />
              </Typography>
              <PhoneInput
                country={"us"}
                enableSearch
                inputProps={{
                  name: "phone",
                  required: true,
                  autoFocus: false,
                }}
                containerStyle={{ width: "100%" }}
                inputStyle={{ width: "100%" }}
              />
              <FormHelperText>
                Provide a mobile phone number to contact the lead passenger.
              </FormHelperText>
            </Box>
          </Grid>
        </Grid>
        {/* SMS Box */}
        <Grid item xs={12}>
          <Paper elevation={0} className="sms-box">
            <SmsOutlined className="sms-icon" />
            <Box>
              <Typography fontWeight="bold">
                Free SMS/text-message updates
              </Typography>
              <Typography variant="body2">
                We will send you the information about your driver 6 hours prior
                to pickup (each way) by text message and e-mail.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ExtraInfo;
