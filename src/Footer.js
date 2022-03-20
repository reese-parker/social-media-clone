import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const styles = {
  AppBar: {top: "auto", bottom: 0, height: "16px" },
  Fab: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
};

export default function Footer() {
  return (
    <AppBar position="fixed" color="primary" sx={styles.AppBar}>
      <Toolbar>
        <Fab sx={styles.Fab} size="medium" color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </Toolbar>
    </AppBar>
  );
}
