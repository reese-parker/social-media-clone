import React, { useContext, useEffect } from "react";

import Grid from "@mui/material/Grid";

import Post from "./Post";
import styles from "./styles/FeedStyles";
import { PostsContext } from "./contexts/PostsContext";
import useGetPosts from "./hooks/useGetPosts";

export default function Feed(props) {
  const { demoMode } = props;

  const { posts: dbPosts, getPosts } = useGetPosts();
  const demoPosts = useContext(PostsContext);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  let posts = demoMode ? demoPosts : dbPosts;

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
            demoMode={demoMode}
          />
        </Grid>
      ))}
    </Grid>
  );
}
