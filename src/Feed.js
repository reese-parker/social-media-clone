import React, { useEffect } from "react";

import Grid from "@mui/material/Grid";

import Post from "./Post";
import styles from "./styles/FeedStyles";
import useGetPosts from "./hooks/useGetPosts";

export default function Feed() {
  const { posts, getPosts } = useGetPosts();

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      wrap="nowrap"
      spacing={2}
      sx={styles.GridContainer}
    >
      {posts.map((post) => (
        <Grid key={post.id} sx={styles.PostContainer} item xs={12}>
          <Post
            id={post.id}
            displayName={post.displayName}
            uid={post.uid}
            postText={post.postText}
            postDate={post.postDate}
          />
        </Grid>
      ))}
    </Grid>
  );
}
