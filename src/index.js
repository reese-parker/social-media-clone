import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PostsProvider } from "./contexts/PostsContext";
import { ActiveUserProvider } from "./contexts/ActiveUserContext";
import "./styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <ActiveUserProvider>
      <PostsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PostsProvider>
    </ActiveUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
