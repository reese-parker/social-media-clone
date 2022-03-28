import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInAsDemo } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { ActiveUserDispatchContext } from "./contexts/ActiveUserContext";
import useInputState from "./hooks/useInputState.js";
import styles from "./styles/SignUpStyles.js";

export default function SignUp(props) {
  const { handleOpenSnackbar } = props;
  const setActiveUser = useContext(ActiveUserDispatchContext);
  const [displayNameValue, handleDisplayNameValueChange] = useInputState("");
  const [emailValue, handleEmailValueChange] = useInputState("");
  const [passwordValue, handlePasswordValueChange] = useInputState("");

  const handleSignInAsDemo = async () => {
    const demoUser = await signInAsDemo();
    setActiveUser(demoUser);
    navigate("/feed");
    handleOpenSnackbar(`Welcome back, ${demoUser.displayName}.`);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await createUserWithEmailAndPassword(
      auth,
      emailValue,
      passwordValue
    );
    await updateProfile(user.user, { displayName: displayNameValue });
    setActiveUser(auth.currentUser);
    navigate("/feed");
    handleOpenSnackbar(`welcome, ${user.user.displayName}`);
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper sx={styles.container} elevation={8}>
        <Grid container direction="column" alignItems="center" wrap="nowrap">
          <Grid
            item
            container
            direction="column"
            wrap="nowrap"
            alignItems="center"
          >
            <Grid item>
              <Avatar sx={styles.Avatar}>
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography component="h1" variant="h5">
                SIGN UP
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                autoFocus
                margin="normal"
                required
                fullWidth
                id="displayName"
                label="Display name"
                name="displayName"
                value={displayNameValue}
                onChange={handleDisplayNameValueChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={emailValue}
                onChange={handleEmailValueChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={passwordValue}
                onChange={handlePasswordValueChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Create Account
              </Button>
              <div style={styles.demoSignInContainer}>
                <Button
                  onClick={handleSignInAsDemo}
                  variant="contained"
                  sx={styles.demoSignInButton}
                >
                  sign in with demo account
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
}
