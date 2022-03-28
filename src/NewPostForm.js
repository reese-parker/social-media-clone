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

import { ActiveUserContext } from "./contexts/ActiveUserContext";
import useInputState from "./hooks/useInputState";
import useGetPosts from "./hooks/useGetPosts";
import styles from "./styles/NewPostFormStyles";

export default function NewPostForm(props) {
  const { open, handleClose, toggleNewPostForm } = props;
  const activeUser = useContext(ActiveUserContext);

  const [postValue, handlePostValueChange, resetPost] = useInputState("");
  const { getPosts } = useGetPosts();

  const createPost = () => {
    if (postValue === "") return;
    let newPost = {
      id: uniqid(),
      displayName: activeUser.displayName,
      uid: activeUser.uid,
      postText: postValue,
      postDate: Date(),
    };
    setDoc(doc(db, "posts", newPost.id), newPost);
    getPosts();
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
