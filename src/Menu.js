import React from "react";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function Menu(props) {
  return (
    <Box>
      <List>
        <ListItem button onClick={props.handleCloseDrawer}>
          <ListItemText primary="home" />
        </ListItem>

      </List>
    </Box>
  );
}


