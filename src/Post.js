import React, { useContext } from "react";

import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import dayjs from "dayjs";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import FaceIcon from "@mui/icons-material/Face";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import EditPostForm from "./EditPostForm";
import useToggleState from "./hooks/useToggleState";
import { PostsContext, PostsDispatchContext } from "./contexts/PostsContext";
import { ActiveUserContext } from "./contexts/ActiveUserContext";
import styles from "./styles/PostStyles";
import useGetPosts from "./hooks/useGetPosts";

export default function Post(props) {
  const { id, displayName, uid, postText, postDate, demoMode } = props;
  const activeUser = useContext(ActiveUserContext);
  const [editMode, toggleEditMode] = useToggleState(false);
  const { getPosts } = useGetPosts();

  const demoPosts = useContext(PostsContext);
  const setDemoPosts = useContext(PostsDispatchContext);

  const deleteDbPost = () => {
    deleteDoc(doc(db, "posts", id));
    getPosts();
  };
  const deleteDemoPost = () => {
    const updatedPosts = demoPosts.filter((post) => post.id !== id);
    setDemoPosts(updatedPosts);
  };

  const deletePost = () => {
    demoMode ? deleteDemoPost() : deleteDbPost();
  };

  return (
    <Fade in={true} timeout={500}>
      <Paper sx={styles.Paper}>
        <Grid container sx={styles.GridContainer}>
          <Grid sx={styles.userIconContainer} item xs={2}>
            {displayName === "Demo" ? (
              <AccountCircleIcon
                color="primary"
                sx={styles.AccountIcon}
                fontSize="large"
              />
            ) : (
              <FaceIcon
                color="primary"
                sx={styles.AccountIcon}
                fontSize="large"
              />
            )}
          </Grid>
          <Grid
            item
            xs={10}
            container
            direction="column"
            spacing={1}
            wrap="nowrap"
          >
            <Grid item xs={2} sx={styles.displayNameContainer}>
              <Typography component="span" sx={styles.displayName}>
                {displayName === null ? "deleted user" : displayName}
              </Typography>
            </Grid>
            <Grid item xs={9} sx={styles.postTextContainer}>
              <Typography sx={styles.postText}>{postText}</Typography>
            </Grid>
            <Grid item xs={1} sx={styles.postInfoContainer}>
              <Typography sx={styles.postDate}>
                {dayjs(postDate).format("YYYY-MM-DD")}
              </Typography>

              {
                // Display edit and delete buttons if activeUser matches
                activeUser !== null && activeUser.uid === uid && (
                  <Box>
                    <IconButton onClick={toggleEditMode}>
                      <EditOutlinedIcon color="secondary" fontSize="medium" />
                    </IconButton>
                    <IconButton onClick={deletePost}>
                      <DeleteForeverOutlinedIcon
                        color="secondary"
                        fontSize="medium"
                      />
                    </IconButton>
                  </Box>
                )
              }
            </Grid>
          </Grid>
        </Grid>

        <EditPostForm
          open={editMode}
          handleClose={toggleEditMode}
          id={id}
          displayName={displayName}
          postText={postText}
          postDate={postDate}
          uid={uid}
          demoMode={demoMode}
        />
      </Paper>
    </Fade>
  );
}
