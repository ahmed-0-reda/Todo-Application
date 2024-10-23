import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function ToastAlert({ open, msg }) {
  return (
    <div>
      <Snackbar open={open}>
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
