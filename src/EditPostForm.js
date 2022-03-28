import React from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import useGetPosts from "./hooks/useGetPosts";
import useInputState from "./hooks/useInputState";
import styles from "./styles/EditPostFormStyles";

export default function EditPostForm(props) {
  const { open, handleClose, id, displayName, postText, postDate, uid } = props;
  const [postValue, handlePostValueChange] = useInputState(postText);
  const { getPosts } = useGetPosts();

  const editPost = async () => {
    if (postValue === "") return;
    const updatedPost = {
      id: id,
      displayName: displayName,
      postText: postValue,
      postDate: postDate,
      uid: uid,
    };
    await updateDoc(doc(db, "posts", id), {
      postText: updatedPost.postText,
    });
    getPosts();
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
