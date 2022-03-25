import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase.js";
import { signOut } from "firebase/auth";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import {
  ActiveUserContext,
  ActiveUserDispatchContext,
} from "./contexts/ActiveUserContext";

export default function Menu(props) {
  const { handleCloseDrawer, handleOpenSnackbar } = props;
  const activeUser = useContext(ActiveUserContext);
  const setActiveUser = useContext(ActiveUserDispatchContext);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    setActiveUser(null);
    handleCloseDrawer();
    navigate("/signin");
    handleOpenSnackbar("signed out");
  };

  return (
    <Box>
      <List>
        <ListItem
          button
          onClick={() => {
            handleCloseDrawer();
            navigate("/");
          }}
        >
          <ListItemText primary="home" />
        </ListItem>
        {activeUser === null ? (
          <>
            {" "}
            <ListItem
              button
              onClick={() => {
                handleCloseDrawer();
                navigate("/signin");
              }}
            >
              <ListItemText primary="sign in" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handleCloseDrawer();
                navigate("/signup");
              }}
            >
              <ListItemText primary="sign up" />
            </ListItem>
          </>
        ) : (
          <>
            {" "}
            <ListItem
              button
              onClick={() => {
                handleCloseDrawer();
                navigate("/accountsettings");
              }}
            >
              <ListItemText wrap="nowrap" primary="account settings" />
            </ListItem>
            <ListItem button onClick={handleSignOut}>
              <ListItemText primary="sign out" />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
}
