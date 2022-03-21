import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { PostsProvider } from "./contexts/PostsContext";
import { ActiveUserProvider } from "./contexts/ActiveUserContext";

ReactDOM.render(
  <React.StrictMode>
    <ActiveUserProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </ActiveUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
