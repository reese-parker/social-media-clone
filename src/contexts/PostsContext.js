import React, { createContext, useState } from "react";

const testPosts = [
  {
    id: 0,
    username: "Reesemate",
    postText:
      "This is a test post, there are many like it. Here are a few more words, altogether it comes to exactly 140 characters. What a coincidence.",
    postDate: new Date(),
  },
  {
    id: 1,
    username: "Hammybee",
    postText:
      "This is a test post, there are many like it. Here are a few more words, altogether it comes to exactly 140 characters. What a coincidence.",
    postDate: new Date(),
  },
];

export const PostsContext = createContext();
export const PostsDispatchContext = createContext();

export function PostsProvider(props) {
  const [posts, setPosts] = useState(testPosts);

  return (
    <PostsContext.Provider value={posts}>
      <PostsDispatchContext.Provider value={setPosts}>
        {props.children}
      </PostsDispatchContext.Provider>
    </PostsContext.Provider>
  );
}
