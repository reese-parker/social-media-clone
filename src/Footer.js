import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewPostForm from "./NewPostForm";
import { ActiveUserContext } from "./contexts/ActiveUserContext";
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

export default function Footer(props) {
  const {handleOpenSnackbar} = props
  const activeUser = useContext(ActiveUserContext);
  const [isNewPostFormOpen, toggleNewPostForm] = useToggleState(false);


  const handleCloseNewPostForm = () => {
    toggleNewPostForm()
    handleOpenSnackbar("post shared")
  }


  return (
    <AppBar color="primary" sx={styles.AppBar}>
      <Toolbar>
        {activeUser && (
          <Fab
            onClick={toggleNewPostForm}
            sx={styles.Fab}
            size="small"
            color="secondary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        )}

        <NewPostForm open={isNewPostFormOpen} handleClose={handleCloseNewPostForm} />
      </Toolbar>
    </AppBar>
  );
}
