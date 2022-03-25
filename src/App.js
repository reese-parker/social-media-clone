import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Snackbar from "@mui/material/Snackbar";
import Navbar from "./Navbar";
import Feed from "./Feed";
import Footer from "./Footer";
import Menu from "./Menu";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import AccountSettings from "./AccountSettings";
import useToggleState from "./hooks/useToggleState";

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

      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: { width: "175px" },
        }}
        elevation={1}
      >
        <Menu
          handleCloseDrawer={toggleDrawer}
          handleOpenSnackbar={handleOpenSnackbar}
        />
      </Drawer>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </div>
  );
}

export default App;
