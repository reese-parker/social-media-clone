import React, { useContext } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { PostsContext, PostsDispatchContext } from "./contexts/PostsContext";
import useInputState from "./hooks/useInputState";

export default function EditPostForm(props) {
  const { open, handleClose, id, username, postText, postDate } = props;
  const posts = useContext(PostsContext);
  const setPosts = useContext(PostsDispatchContext);

  const [postValue, handlePostValueChange] = useInputState(postText);

  const editPost = () => {
    if (postValue === "") return;
    const updatedPost = {
      id: id,
      username: username,
      postText: postValue,
      postDate: postDate,
    };
    const updatedPosts = posts.map((post) =>
      post.id === id ? updatedPost : post
    );
    setPosts(updatedPosts);
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
        <Button onClick={editPost}>save post</Button>
      </DialogActions>
    </Dialog>
  );
}
