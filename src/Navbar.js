import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const styles = {
  AppBar: {
    position: "sticky",
  },
  IconButton: { mr: 2 },
  Title: { flexGrow: 1, fontWeight: 700 },
};

export default function Navbar(props) {
  const { handleOpenDrawer } = props;

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
        <Typography component="div" sx={styles.Title}>
          social media clone
        </Typography>
        <Button color="inherit">Sign In</Button>
      </Toolbar>
    </AppBar>
  );
}
