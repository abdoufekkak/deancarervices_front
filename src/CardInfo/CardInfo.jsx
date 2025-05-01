import React from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
} from "@mui/material";
import "./CardInfo.css";

function CardInfo() {
  return (
    <Card className="card-info">
      <CardContent className="card-content">
        <div className="section-header">
          <Typography variant="h6" className="title">
            Extras and notes
          </Typography>
        </div>

        <div className="form-section">
          <Typography className="label">
            Flight/train number <span className="question-icon">?</span>
          </Typography>
          <TextField
            placeholder="Example: LH1868"
            variant="outlined"
            size="small"
            fullWidth
            className="input-field"
          />
          <Typography className="helper-text">
            Please provide a flight number (The driver will monitor your flight)
          </Typography>
        </div>

        <div className="form-section">
          <FormControlLabel
            control={<Checkbox />}
            label="Do you need a child seat or booster seat?"
          />
        </div>

        <div className="form-section">
          <Typography className="label">
            Notes for the chauffeur (Outward){" "}
            <span className="question-icon">?</span>
          </Typography>
          <TextField
            multiline
            rows={3}
            placeholder="Baggage information, special requests ..."
            variant="outlined"
            fullWidth
            className="input-field"
          />
        </div>

        <div className="button-container">
          <Button variant="contained" className="continue-button">
            CONTINUE
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardInfo;
