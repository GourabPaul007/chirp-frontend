import { createMuiTheme, CssBaseline, Grid, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Main from "./components/main";
import SingleTweet from "./components/singleTweet";
import Banner from "./components/banner";
import BookmarksPage from "./components/bannerComponents/bookmarksPage";
import LikesPage from "./components/bannerComponents/likesPage";

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
                <Grid container spacing={0}>
                  {/* Banner Grid - left hand side */}
                  <Grid item xs={2} sm={4} lg={4}>
                    <Banner />
                  </Grid>

                  <BrowserRouter>
                    {/* Middle Grid - news feed & make tweet */}
                    <Grid item xs={10} sm={6} lg={5}>
                      <Route path="/" exact>
                        <Main />
                      </Route>
                      <Route path={`/tweet/:tweetId`}>
                        <SingleTweet />
                      </Route>
                      <Route path={`/:username/bookmarks`}>
                        <BookmarksPage />
                      </Route>
                      <Route path={`/:username/likes`}>
                        <LikesPage />
                      </Route>
                    </Grid>
                  </BrowserRouter>

                  {/* Right Grid - functionality isn't fixed yet */}
                  <Grid item xs={false} sm={2} lg={3}></Grid>
                </Grid>

                {/* for blank content, it will fill the page when theres no comment */}
                <div style={{ background: "#000", height: 500 }}>&nbsp;</div>
              </div>
            </ThemeProvider>
          </RepliesProvider>
        </CommentsProvider>
      </TweetProvider>
    </>
  );
}

export default App;
