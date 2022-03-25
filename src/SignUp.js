import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { ActiveUserDispatchContext } from "./contexts/ActiveUserContext";
import useInputState from "./hooks/useInputState.js";

export default function SignUp(props) {
  const { handleOpenSnackbar } = props;
  const setActiveUser = useContext(ActiveUserDispatchContext);
  const [displayNameValue, handleDisplayNameValueChange] = useInputState("");
  const [emailValue, handleEmailValueChange] = useInputState("");
  const [passwordValue, handlePasswordValueChange] = useInputState("");

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
    <Grid container direction="column" alignItems="center" wrap="nowrap">
      <Grid item container direction="column" wrap="nowrap" alignItems="center">
        <Grid item>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
        </Box>
      </Grid>
    </Grid>
  );
}
