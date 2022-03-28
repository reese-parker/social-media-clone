import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import App from "./App";
import { PostsProvider } from "./contexts/PostsContext";
import { ActiveUserProvider } from "./contexts/ActiveUserContext";
import "./styles/index.css";
import theme from "./styles/theme"


ReactDOM.render(
  <React.StrictMode>
    <ActiveUserProvider>
      <PostsProvider>
        <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
          </ThemeProvider>
        </BrowserRouter>
      </PostsProvider>
    </ActiveUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
