import { useContext, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { PostsDispatchContext, PostsContext } from "../contexts/PostsContext";

function useGetPosts() {
  const posts = useContext(PostsContext);
  const setPosts = useContext(PostsDispatchContext);

  const getPosts = useCallback(async () => {
    const retrievedPosts = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      retrievedPosts.push(doc.data());
    });
    // Reverses retrieved posts to display most recent posts first
    setPosts(retrievedPosts.reverse());
  }, [setPosts]);

  return { posts, getPosts };
}

export default useGetPosts;
