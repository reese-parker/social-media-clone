import React from "react";

import Grid from "@mui/material/Grid";

import Post from "./Post";

const styles = {
  PostContainer: {
    width: "96%",
  },
};

export default function Feed() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      <Grid sx={styles.PostContainer} item xs={12}>
        <Post />
      </Grid>
    </Grid>
  );
}
