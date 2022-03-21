import React, { useContext } from "react";
import uniqid from "uniqid";

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
  const activeUser = useContext(ActiveUserContext);
  const posts = useContext(PostsContext);
  const setPosts = useContext(PostsDispatchContext);

  const [postValue, handlePostValueChange, resetPost] = useInputState("");

  const { open, handleClose } = props;

  const createPost = () => {
    if (postValue === "") return;
    let newPost = {
      id: uniqid(),
      username: activeUser.username,
      postText: postValue,
      postDate: new Date(),
    };
    setPosts([...posts, newPost]);
    resetPost();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>New Post</DialogTitle>
      <DialogContent>
        <TextField
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
