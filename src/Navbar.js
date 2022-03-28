import React, { useContext } from "react";

import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FaceIcon from "@mui/icons-material/Face";
import MenuIcon from "@mui/icons-material/Menu";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ActiveUserContext } from "./contexts/ActiveUserContext";
import styles from "./styles/NavbarStyles";

export default function Navbar(props) {
  const { handleOpenDrawer } = props;
  const activeUser = useContext(ActiveUserContext);

  return (
    <AppBar color="primary" sx={styles.AppBar}>
      <Box sx={styles.headerToolbar} />
      <Toolbar sx={styles.ToolbarContainer}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={styles.IconButton}
          onClick={handleOpenDrawer}
        >
          <MenuIcon sx={styles.MenuIcon} />
        </IconButton>
        <Typography sx={styles.Title}>SOCIAL MEDIA CLONE</Typography>
        {activeUser === null ? (
          <Link style={styles.signInLink} to="/signin">
            <Button sx={styles.signInButton}>Sign In</Button>
          </Link>
        ) : (
          <Box sx={styles.profile}>
            {activeUser.displayName === "Demo" ? (
              <AccountCircleIcon fontSize="small" />
            ) : (
              <FaceIcon />
            )}
            <Typography sx={styles.displayName}>
              {activeUser.displayName}
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
