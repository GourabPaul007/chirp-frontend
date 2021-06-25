import { createMuiTheme, CssBaseline, Grid } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Main from "./components/main";
import SingleTweet from "./components/singleTweet";
import Banner from "./components/banner";

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
                  <Grid container spacing={0}>
                    {/* Banner Grid - left hand side */}
                    <Grid item xs={4}>
                      <Banner />
                    </Grid>
                    {/* Middle Grid - news feed & make tweet */}
                    <Grid item xs={5}>
                      <Route path="/" exact>
                        <Main />
                      </Route>
                      <Route path={`/tweet/:tweetId`}>
                        <SingleTweet />
                      </Route>
                    </Grid>
                    <Grid item xs={3}></Grid>
                  </Grid>
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
