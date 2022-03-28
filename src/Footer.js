import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import NewPostForm from "./NewPostForm";
import { ActiveUserContext } from "./contexts/ActiveUserContext";
import useToggleState from "./hooks/useToggleState";
import styles from "./styles/FooterStyles";

export default function Footer(props) {
  const { handleOpenSnackbar, demoMode } = props;
  const activeUser = useContext(ActiveUserContext);
  const [isNewPostFormOpen, toggleNewPostForm] = useToggleState(false);

  const navigate = useNavigate();

  const handleCloseNewPostForm = () => {
    toggleNewPostForm();
    navigate("/feed");
    handleOpenSnackbar("post shared");
  };


  return (
    <AppBar color="primary" sx={styles.AppBar}>
      <Toolbar>
        {activeUser && (
          <Fab
            onClick={toggleNewPostForm}
            sx={styles.Fab}
            size="small"
            aria-label="add"
            color="secondary"
          >
            <AddIcon sx={styles.AddIcon} />
          </Fab>
        )}

        <NewPostForm
          open={isNewPostFormOpen}
          demoMode={demoMode}
          handleClose={handleCloseNewPostForm}
          toggleNewPostForm={toggleNewPostForm}
        />
      </Toolbar>
    </AppBar>
  );
}
