import React, { useEffect, useContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Grid from "@mui/material/Grid";
import Post from "./Post";
import { PostsContext, PostsDispatchContext } from "./contexts/PostsContext";

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
  const setPosts = useContext(PostsDispatchContext);

  useEffect(() => {
    (async () => {
      const retrievedPosts = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        retrievedPosts.push(doc.data());
      });
      setPosts(retrievedPosts);
    })();
  }, [setPosts]);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      wrap="nowrap"
      spacing={1}
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
