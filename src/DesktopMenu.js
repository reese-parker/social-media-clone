import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";
import { auth } from "./firebase.js";
import { signOut } from "firebase/auth";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FaceIcon from "@mui/icons-material/Face";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";

import {
  ActiveUserContext,
  ActiveUserDispatchContext,
} from "./contexts/ActiveUserContext";
import styles from "./styles/MenuStyles.js";

export default function DesktopMenu(props) {
  const { handleOpenSnackbar } = props;
  const activeUser = useContext(ActiveUserContext);
  const setActiveUser = useContext(ActiveUserDispatchContext);

  const navigate = useNavigate();

  const handleSignOut = async () => {
    navigate("/signin");
    await signOut(auth);
    setActiveUser(null);
    
    handleOpenSnackbar("Signed out");
  };

  return (
    <Box sx={styles.container}>
      {
        // Menu header for signed in users
        activeUser && (
          <ListItem divider sx={styles.userInfoContainer}>
            <ListItemIcon sx={styles.userInfoContainer}>
              {activeUser.displayName === "Demo" ? (
                <AccountCircleIcon color="primary" />
              ) : (
                <FaceIcon color="primary" />
              )}
              <Typography sx={styles.displayName}>
                {activeUser.displayName}
              </Typography>
            </ListItemIcon>
          </ListItem>
        )
      }

      <List>
        <ListItem
          sx={styles.ListItem}
          button
          onClick={() => {
            navigate("/feed");
          }}
        >
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>

        {
          // Conditional list items based on activeUser
          activeUser === null ? (
            <>
              <ListItem
                sx={styles.ListItem}
                button
                onClick={() => {
                  navigate("/signin");
                }}
              >
                <ListItemIcon>
                  <LoginIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Sign in" />
              </ListItem>
              <ListItem
                sx={styles.ListItem}
                button
                onClick={() => {
                  navigate("/signup");
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Sign up" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                sx={styles.ListItem}
                button
                onClick={() => {
                  navigate("/accountsettings");
                }}
              >
                <ListItemIcon>
                  <SettingsIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Settings"></ListItemText>
              </ListItem>
              <ListItem
                divider
                sx={styles.ListItem}
                button
                onClick={handleSignOut}
              >
                <ListItemIcon>
                  <LogoutIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItem>
            </>
          )
        }
      </List>
    </Box>
  );
}
