import { createMuiTheme, CssBaseline, Grid, makeStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";

import Main from "./components/Main";
import SingleTweet from "./components/SingleTweet";
import BookmarksPage from "./components/bannerComponents/BoorkmarksPage";
import LikesPage from "./components/bannerComponents/LikesPage";

import { CommentsProvider } from "./contexts/commentsContext";
import { TweetProvider } from "./contexts/tweetContext";
import { RepliesProvider } from "./contexts/repliesContext";
import LogIn from "./components/LoginAndSignUp/LogIn";
import SignUp from "./components/LoginAndSignUp/SignUp";
import { AuthProvider } from "./contexts/authContext";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./components/LoginAndSignUp/ForgotPassword";
import UpdateAccount from "./components/bannerComponents/UpdateAccount";
import Profile from "./components/bannerComponents/ProfilePage";
import EditProfile from "./components/bannerComponents/EditProfile";
import { ProfileContext, ProfileProvider } from "./contexts/ProfileContext";

import { useAuth } from "./contexts/authContext";
import { useContext, useEffect } from "react";
import axios from "axios";
import OtherProfile from "./components/OtherProfile";

function App() {
  const [profile, setProfile] = useContext(ProfileContext);
  const { currentUser } = useAuth();

  // Setting profile at app start
  useEffect(async () => {
    if (currentUser) {
      const url = `http://localhost:5000/api/user/${currentUser.uid}/getUser`;
      const data = await axios.get(url, {
        email: currentUser.email,
      });
      // console.log(data.data);
      setProfile((profile) => ({
        ...profile,
        _id: currentUser._id,
        name: data.data.name,
        username: data.data.username,
        uid: data.data.uid,
        email: currentUser.email,
        about: data.data.about,
      }));
    }
  }, []);

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
                    <PrivateRoute path="/" exact component={Main} />
                    {/* <Main />
                      </PrivateRoute> */}
                    <Grid item xs={12}>
                      <Route path="/signup">
                        <SignUp />
                      </Route>
                    </Grid>
                    <Grid item xs={12}>
                      <Route path="/login">
                        <LogIn />
                      </Route>
                    </Grid>
                    <Grid item xs={12}>
                      <Route path={`/forgot-password`}>
                        <ForgotPassword />
                      </Route>
                    </Grid>
                    {/* YOU NEED TO USE SELF CLOSING ROUTE HANDLERS ON BOTH SIDES */}
                    <PrivateRoute path={`/tweet/:tweetId`} component={SingleTweet} />
                    <PrivateRoute path={`/:username/bookmarks`} component={BookmarksPage} />
                    <PrivateRoute path={`/:username/likes`} component={LikesPage} />
                    <PrivateRoute path={`/profile`} component={Profile} />
                    <PrivateRoute path={`/update-account`} component={UpdateAccount} />
                    <PrivateRoute path={`/edit-profile`} component={EditProfile} />
                    <PrivateRoute path={`/user-profiles/:username`} component={OtherProfile} />
                  </Grid>

                  {/* Right Grid - functionality isn't fixed yet */}
                  {/* <Grid item xs={false} sm={2} lg={3}>
                      <AuthBanner />
                    </Grid> */}
                  {/* </Grid> */}
                </BrowserRouter>

                {/* for blank content, it will fill the page when theres no comment */}
                <div style={{ background: "#000", height: 500 }}>&nbsp;</div>
              </div>
            </ThemeProvider>
          </RepliesProvider>
        </CommentsProvider>
      </TweetProvider>
      {/* </ProfileProvider> */}
      {/* </AuthProvider> */}
    </>
  );
}

export default App;
