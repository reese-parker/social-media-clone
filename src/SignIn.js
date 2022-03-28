import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { auth, signInAsDemo } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
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
import styles from "./styles/SignInStyles.js";

export default function SignIn(props) {
  const { handleOpenSnackbar } = props;
  const setActiveUser = useContext(ActiveUserDispatchContext);
  const [emailValue, handleEmailValueChange] = useInputState("");
  const [passwordValue, handlePasswordValueChange, resetPasswordValue] =
    useInputState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const signInFail = () => {
    resetPasswordValue();
    setError(true);
  };

  const handleSignInAsDemo = async () => {
    const demoUser = await signInAsDemo();
    setActiveUser(demoUser);
    navigate("/feed");
    handleOpenSnackbar(`Welcome back, ${demoUser.displayName}.`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(
      auth,
      emailValue,
      passwordValue
    ).catch(signInFail);
    setActiveUser(user.user);
    navigate("/feed");
    handleOpenSnackbar(`Welcome back, ${user.user.displayName}.`);
  };

  const resetPassword = async () => {
    const email = prompt("enter your email address");
    await sendPasswordResetEmail(auth, email);
    handleOpenSnackbar("Reset password email sent.");
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
                SIGN IN
              </Typography>
            </Grid>
          </Grid>

          <Grid item>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                required
                fullWidth
                error={error}
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
                error={error}
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
                sx={{ mt: 2, mb: 2 }}
              >
                sign in
              </Button>
              <Button
                onClick={handleSignInAsDemo}
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                sign in with demo account
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                create a new account
              </Button>
              <div style={styles.resetPasswordContainer}>
                <Button
                  onClick={resetPassword}
                  variant="contained"
                  sx={styles.resetPasswordButton}
                >
                  reset password
                </Button>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Fade>
  );
}
