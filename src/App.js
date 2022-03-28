import React, { useState } from "react";

import { Routes, Route } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Snackbar from "@mui/material/Snackbar";

import Navbar from "./Navbar";
import Feed from "./Feed";
import Footer from "./Footer";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import AccountSettings from "./AccountSettings";
import WelcomeMessage from "./WelcomeMessage";
import useToggleState from "./hooks/useToggleState";
import styles from "./styles/AppStyles";

function App() {
  const [isDrawerOpen, toggleDrawer] = useToggleState(false);
  const [isSnackbarOpen, toggleSnackbar] = useToggleState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    toggleSnackbar();
  };

  const handleCloseSnackbar = () => {
    setSnackbarMessage("");
    toggleSnackbar();
  };

  return (
    <div className="App">
      <Navbar handleOpenDrawer={toggleDrawer} />

      {
        //Routes for main content
      }
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route
          path="/signin"
          element={<SignIn handleOpenSnackbar={handleOpenSnackbar} />}
        />
        <Route
          path="/signup"
          element={<SignUp handleOpenSnackbar={handleOpenSnackbar} />}
        />
        <Route
          path="/accountsettings"
          element={<AccountSettings handleOpenSnackbar={handleOpenSnackbar} />}
        />
        <Route path="*" element={<Feed />} />
      </Routes>

      <Footer handleOpenSnackbar={handleOpenSnackbar} />

      {
        //Mobile Menu
      }
      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={toggleDrawer}
        elevation={16}
        PaperProps={{ sx: styles.mobileDrawerPaperProps }}
      >
        <MobileMenu
          handleCloseDrawer={toggleDrawer}
          handleOpenSnackbar={handleOpenSnackbar}
        />
      </Drawer>

      {
        //Desktop Menu
      }
      <Drawer
        anchor={"left"}
        variant="permanent"
        sx={styles.desktopDrawer}
        PaperProps={{ sx: styles.desktopDrawerPaperProps }}
      >
        <DesktopMenu handleOpenSnackbar={handleOpenSnackbar} />
      </Drawer>

      {
        //Reusable Snackbar
      }
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />

      {
        //Message regarding demo version shown on page load
      }
      <WelcomeMessage />
    </div>
  );
}

export default App;
