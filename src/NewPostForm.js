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
import { PostsContext, PostsDispatchContext } from "./contexts/PostsContext";
import { ActiveUserContext } from "./contexts/ActiveUserContext";
import useInputState from "./hooks/useInputState";

export default function NewPostForm(props) {
  const { open, handleClose } = props;
  const activeUser = useContext(ActiveUserContext);
  const posts = useContext(PostsContext);
  const setPosts = useContext(PostsDispatchContext);
  const [postValue, handlePostValueChange, resetPost] = useInputState("");

  const createPost = () => {
    let newPost = {
      id: uniqid(),
      displayName: activeUser.displayName,
      uid: activeUser.uid,
      postText: postValue,
      postDate: Date(),
    };
    setDoc(doc(db, "posts", newPost.id), newPost);
    setPosts([...posts, newPost]);
    resetPost();
    handleClose();
  };



  return (
    <Dialog open={open} onClose={handleClose} >
      <DialogTitle>New Post</DialogTitle>
      <DialogContent>
        <TextField
          required
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
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={createPost}>share post</Button>
      </DialogActions>
    
    </Dialog>
  );
}
