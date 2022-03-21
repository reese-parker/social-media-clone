import React from "react";

import Drawer from "@mui/material/Drawer";

import Navbar from "./Navbar";
import Feed from "./Feed";
import Footer from "./Footer"
import Menu from "./Menu"

import useToggleState from "./hooks/useToggleState";

function App() {

  const [isDrawerOpen, toggleDrawer] = useToggleState(false);


  return (
    <div className="App">
      <Navbar handleOpenDrawer={toggleDrawer} />
      <Feed />
      <Footer />

      <Drawer
        anchor={"left"}
        open={isDrawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {width: "150px"}
        }}
        elevation={1}
      >
        <Menu handleCloseDrawer={toggleDrawer} />
      </Drawer>
    </div>
  );
}

export default App;
