import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import NewPostForm from "./NewPostForm";

import useToggleState from "./hooks/useToggleState";

const styles = {
  AppBar: { position: "fixed", top: "auto", bottom: 0, height: "16px" },
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
  const [isNewPostFormOpen, toggleNewPostForm] = useToggleState(false);

  return (
    <AppBar color="primary" sx={styles.AppBar}>
      <Toolbar>
        <Fab
          onClick={toggleNewPostForm}
          sx={styles.Fab}
          size="small"
          color="secondary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
        <NewPostForm open={isNewPostFormOpen} handleClose={toggleNewPostForm} />
      </Toolbar>
    </AppBar>
  );
}
