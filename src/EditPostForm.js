import React, { useContext } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { PostsContext, PostsDispatchContext } from "./contexts/PostsContext";
import useGetPosts from "./hooks/useGetPosts";
import useInputState from "./hooks/useInputState";
import styles from "./styles/EditPostFormStyles";

export default function EditPostForm(props) {
  const {
    open,
    handleClose,
    id,
    displayName,
    postText,
    postDate,
    uid,
    demoMode,
  } = props;
  const [postValue, handlePostValueChange] = useInputState(postText);
  const { getPosts } = useGetPosts();

  const demoPosts = useContext(PostsContext);
  const setDemoPosts = useContext(PostsDispatchContext);

  // save post to database and update state
  const savePost = async (updatedPost) => {
    await updateDoc(doc(db, "posts", id), {
      postText: updatedPost.postText,
    });
    getPosts();
  };

  // save post to a local array and update state
  const demoSavePost = (updatedPost) => {
    const updatedPosts = demoPosts.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setDemoPosts(updatedPosts);
  };

  const editPost = async () => {
    if (postValue === "") return;
    const updatedPost = {
      id: id,
      displayName: displayName,
      postText: postValue,
      postDate: postDate,
      uid: uid,
    };

    demoMode ? demoSavePost(updatedPost) : savePost(updatedPost);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={styles.container}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            sx={styles.TextField}
            autoFocus
            multiline
            margin="dense"
            id="post"
            label="post"
            type="text"
            fullWidth
            variant="standard"
            value={postValue}
            onChange={handlePostValueChange}
            required
          />
        </DialogContent>
        <DialogActions sx={styles.buttonsContainer}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={editPost}>save post</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
