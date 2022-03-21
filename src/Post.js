import React, { useContext } from "react";

import dayjs from "dayjs";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import useToggleState from "./hooks/useToggleState";
import { PostsContext, PostsDispatchContext } from "./contexts/PostsContext";
import { ActiveUserContext } from "./contexts/ActiveUserContext";
import EditPostForm from "./EditPostForm";

const styles = {
  GridContainer: {
    minHeight: "120px",
  },
  userIconContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  username: {
    fontWeight: 700,
  },
  postText: {
    lineHeight: 1.25,
  },
  postInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  postDate: {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "rgb(84,100,112)",
  },
};

export default function Post(props) {
  const { id, username, postText, postDate } = props;

  const [editMode, toggleEditMode] = useToggleState(false);

  const posts = useContext(PostsContext);
  const setPosts = useContext(PostsDispatchContext);
  const activeUser = useContext(ActiveUserContext);

  const deletePost = () => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  return (
    <Paper>
      <Grid container sx={styles.GridContainer}>
        <Grid sx={styles.userIconContainer} item xs={2}>
          <AccountCircleIcon fontSize="large" />
        </Grid>
        <Grid
          item
          xs={10}
          container
          direction="column"
          spacing={1}
          wrap="nowrap"
        >
          <Grid item xs={2} sx={styles.usernameContainer}>
            <Typography sx={styles.username}>{username}</Typography>
          </Grid>
          <Grid item xs={9} sx={styles.postTextContainer}>
            <Typography sx={styles.postText}>{postText}</Typography>
          </Grid>
          <Grid item xs={1} sx={styles.postInfoContainer}>
            <Typography sx={styles.postDate}>
              {dayjs(postDate).format("YYYY-MM-DD")}
            </Typography>
            {activeUser.username === username && (
              <Box>
                <IconButton onClick={toggleEditMode}>
                  <EditOutlinedIcon fontSize="small" />
                </IconButton>
                <IconButton onClick={deletePost}>
                  <DeleteForeverOutlinedIcon fontSize="small" />
                </IconButton>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>

      <EditPostForm
        open={editMode}
        handleClose={toggleEditMode}
        id={id}
        username={username}
        postText={postText}
        postDate={postDate}
      />
    </Paper>
  );
}
