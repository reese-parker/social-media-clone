import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ActiveUserContext } from "./contexts/ActiveUserContext";

const styles = {
  AppBar: {
    position: "sticky",
  },
  IconButton: { mr: 2 },
  Title: { flexGrow: 1, fontWeight: 700 },
};

export default function Navbar(props) {
  const { handleOpenDrawer } = props;
  const activeUser = useContext(ActiveUserContext);

  return (
    <AppBar sx={styles.AppBar}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={styles.IconButton}
          onClick={handleOpenDrawer}
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={styles.Title}>social media clone</Typography>
        {activeUser === null ? (
          <Link to="/signin">
            <Button color="inherit">Sign In</Button>
          </Link>
        ) : (
          <>
            <AccountCircleIcon />
            {activeUser.displayName}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
