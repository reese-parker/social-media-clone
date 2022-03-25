import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInAsDemo } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ActiveUserDispatchContext } from "./contexts/ActiveUserContext";
import useInputState from "./hooks/useInputState.js";

export default function SignIn(props) {
  const { handleOpenSnackbar } = props;
  const setActiveUser = useContext(ActiveUserDispatchContext);
  const [emailValue, handleEmailValueChange] = useInputState("");
  const [passwordValue, handlePasswordValueChange, resetPasswordValue] =
    useInputState("");

  const navigate = useNavigate();

  const signInFail = () => {
    resetPasswordValue();
  };

  const handleSignInAsDemo = async () => {
    const demoUser = await signInAsDemo();
    setActiveUser(demoUser);
    navigate("/feed");
    handleOpenSnackbar(`welcome back, ${demoUser.displayName}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(
      auth,
      emailValue,
      passwordValue
    ).catch(signInFail);
    setActiveUser(user.user);
    handleOpenSnackbar(`welcome back, ${user.user.displayName}`);
    navigate("/feed");
  };

  return (
    <Grid container direction="column" alignItems="center" wrap="nowrap">
      <Grid item container direction="column" wrap="nowrap" alignItems="center">
        <Grid item>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
            sign in
          </Button>
          <Button
            onClick={handleSignInAsDemo}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            sign in with demo account
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
