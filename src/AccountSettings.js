import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { auth } from "./firebase.js";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import {
  ActiveUserContext,
  ActiveUserDispatchContext,
} from "./contexts/ActiveUserContext";
import useToggleState from "./hooks/useToggleState";

export default function AccountSettings(props) {
  const {handleOpenSnackbar} = props
  const activeUser = useContext(ActiveUserContext);
  const setActiveUser = useContext(ActiveUserDispatchContext);
  const [confirmSignOutDialog, toggleConfirmSignOutDialog] =
    useToggleState(false);

  const navigate = useNavigate();

  const handleDeleteUser = async () => {
    await deleteUser(auth.currentUser);
    setActiveUser(null);
    toggleConfirmSignOutDialog();
    navigate("/signup");
    handleOpenSnackbar("account deleted")
  };

  useEffect(() => {
    activeUser === null && navigate("/signin");
  });

  return (
    <>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Button variant="outlined" onClick={toggleConfirmSignOutDialog}>
            delete account
          </Button>
        </Grid>
      </Grid>

      <Dialog
        open={confirmSignOutDialog}
        onClose={toggleConfirmSignOutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          are you sure you want to delete your account?
        </DialogTitle>

        <DialogActions>
          <Button onClick={toggleConfirmSignOutDialog}>cancel</Button>
          <Button onClick={handleDeleteUser}>delete account</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
