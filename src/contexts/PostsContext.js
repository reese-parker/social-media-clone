import React, { createContext, useState } from "react";


export const PostsContext = createContext();
export const PostsDispatchContext = createContext();

export function PostsProvider(props) {
  const [posts, setPosts] = useState([]);

  return (
    <PostsContext.Provider value={posts}>
      <PostsDispatchContext.Provider value={setPosts}>
        {props.children}
      </PostsDispatchContext.Provider>
    </PostsContext.Provider>
  );
}
