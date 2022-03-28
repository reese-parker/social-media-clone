import React, { useContext } from "react";

import uniqid from "uniqid";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { PostsDispatchContext, PostsContext } from "./contexts/PostsContext";
import { ActiveUserContext } from "./contexts/ActiveUserContext";
import useInputState from "./hooks/useInputState";
import useGetPosts from "./hooks/useGetPosts";
import styles from "./styles/NewPostFormStyles";

export default function NewPostForm(props) {
  const { open, handleClose, toggleNewPostForm, demoMode } = props;
  const activeUser = useContext(ActiveUserContext);
  const [postValue, handlePostValueChange, resetPost] = useInputState("");
  const { getPosts } = useGetPosts();
  const posts = useContext(PostsContext);
  const setPosts = useContext(PostsDispatchContext);

  // save post to database and update state
  const savePost = (newPost) => {
    setDoc(doc(db, "posts", newPost.id), newPost);
    getPosts();
  };

  // save post to a local array and update state
  const demoSavePost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
  };

  const createPost = () => {
    if (postValue === "") return;
    let newPost = {
      id: uniqid(),
      displayName: activeUser.displayName,
      uid: activeUser.uid,
      postText: postValue,
      postDate: Date(),
    };
    demoMode ? demoSavePost(newPost) : savePost(newPost);
    resetPost();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={toggleNewPostForm}>
      <div style={styles.container}>
        <DialogTitle>Say something...</DialogTitle>
        <DialogContent>
          <TextField
            sx={styles.TextField}
            multiline
            autoFocus
            margin="dense"
            id="post"
            label="post"
            type="text"
            fullWidth
            variant="standard"
            value={postValue}
            onChange={handlePostValueChange}
          />
        </DialogContent>
        <DialogActions style={styles.buttonsContainer}>
          <Button onClick={toggleNewPostForm}>Cancel</Button>
          <Button onClick={createPost}>Share post</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
