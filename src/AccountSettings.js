import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUser } from "firebase/auth";
import { auth } from "./firebase.js";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Fade from "@mui/material/Fade";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  ActiveUserContext,
  ActiveUserDispatchContext,
} from "./contexts/ActiveUserContext";
import useToggleState from "./hooks/useToggleState";
import styles from "./styles/AccountSettingsStyles.js";

export default function AccountSettings(props) {
  const { handleOpenSnackbar } = props;
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
    handleOpenSnackbar("account deleted");
  };

  useEffect(() => {
    activeUser === null && navigate("/signin");
  });

  return (
    <Fade in={true} timeout={500}>
      <Paper sx={styles.container}>
        <Grid container direction="column" alignItems="center" spacing={1}>
          <Grid
            item
            container
            direction="column"
            wrap="nowrap"
            alignItems="center"
          >
            <Grid item>
              <Avatar sx={styles.Avatar}>
                <SettingsIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">
                SETTINGS
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Button
              onClick={toggleConfirmSignOutDialog}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
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
      </Paper>
    </Fade>
  );
}
