import React, { useContext } from "react";

import Grid from "@mui/material/Grid";

import Post from "./Post";
import { PostsContext } from "./contexts/PostsContext";

const styles = {
  GridContainer: {
    paddingTop: "10px",
  },
  PostContainer: {
    width: "96%",
  },
};

export default function Feed() {
  const posts = useContext(PostsContext);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      wrap="nowrap"
      spacing={1}
      sx={styles.GridContainer}
    >
      {posts.map((post) => (
        <Grid key={post.id} sx={styles.PostContainer} item xs={12}>
          <Post
            id={post.id}
            username={post.username}
            postText={post.postText}
            postDate={post.postDate}
          />
        </Grid>
      ))}
    </Grid>
  );
}
