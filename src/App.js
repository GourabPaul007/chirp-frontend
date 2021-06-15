import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Main from "./components/main";
import SingleTweet from "./components/singleTweet";
import { CommentsProvider } from "./contexts/commentsContext";
import { TweetContext, TweetProvider } from "./contexts/tweetContext";
import { RepliesProvider } from "./contexts/repliesContext";

function App() {
  return (
    <>
      <TweetProvider>
        <CommentsProvider>
          <RepliesProvider>
            <ThemeProvider
              theme={createMuiTheme({
                palette: {
                  type: "dark",
                  primary: {
                    main: "#2196F3",
                  },
                },
              })}
            >
              <CssBaseline />
              <div className="App">
                <CssBaseline />
                <BrowserRouter>
                  <Route path="/" exact>
                    <Main />
                  </Route>
                  <Route path={`/tweet/:tweetId`}>
                    <SingleTweet />
                  </Route>
                </BrowserRouter>
              </div>
            </ThemeProvider>
          </RepliesProvider>
        </CommentsProvider>
      </TweetProvider>
    </>
  );
}

export default App;
