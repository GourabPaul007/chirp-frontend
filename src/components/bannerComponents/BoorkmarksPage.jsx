import {
  Container,
  Grid,
  Card,
  makeStyles,
  CardContent,
  CardHeader,
  CardActions,
  CardActionArea,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import MakeComment from "../ActionsTweet/makeComment";
import MakeSave from "../ActionsTweet/makeSave";
import MakeLike from "../ActionsTweet/makeLike";
import MakeSend from "../ActionsTweet/makeSend";

import timeConverter from "../../utils/timeConverter";

import axios from "axios";
import { red } from "@material-ui/core/colors";
import Banner from "../banner";
import { ProfileContext } from "../../contexts/ProfileContext";
import MoreBannerTweetOptions from "./MoreBannerTweetOptions";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: 24,
    marginBottom: 24,
    background: "#000000",
    border: "1px solid #777",
    borderRadius: 15,
  },
  tweetBody: {
    textAlign: "left",
    color: "#D9D9D9",
    fontSize: 23,
    paddingLeft: 8,
  },
  avatar: {
    backgroundColor: red[500],
  },
  title: {
    fontWeight: "bold",
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#D9D9D9",
  },
  username: {
    color: "#777",
    fontSize: 16,
    fontWeight: 300,
    marginRight: "auto",
    marginTop: 6,
    marginBottom: "auto",
    marginLeft: 6,
    alignSelf: "flex-start",
    textAlign: "left",
  },
  subHeader: {
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#777",
  },
  // likes & comments view section border stuff
  statusBlock: {
    border: "1px solid #2F3336",
    // borderRadius: 10,
    borderLeftStyle: "none",
    borderRightStyle: "none",
    marginRight: 20,
    marginLeft: 20,
  },
  likesAndComments: {
    display: "inline-block",
    color: "#777",
  },
  topCard: {
    backgroundColor: "#000",
    border: "1px solid #777",
    borderRadius: 15,
    marginTop: 24,
    color: "#d9d9d9",
  },
}));

const BookmarksPage = () => {
  const classes = useStyles();

  const [profile, setProfile] = useContext(ProfileContext);

  const [tweets, setTweets] = useState([
    {
      _id: null,
      name: null,
      username: null,
      authorID: null,
      body: null,
      date: null,
      likes: [],
      saves: [],
      comments: [],
    },
  ]);

  useEffect(async () => {
    const url = `http://localhost:5000/api/banner/${profile.uid}/bookmarks`;
    const data = await axios.get(url);
    console.log(data.data);
    for (let i = 0; i < data.data.length; i++) {
      //t is a tweet object i.e. its the whole tweet
      let t = data.data[i];
      setTweets((tweets) => [
        ...tweets,
        {
          _id: t._id,
          name: t.name,
          username: t.username,
          authorID: t.authorID,
          body: t.body,
          date: t.date,
          likes: t.likes,
          saves: t.saves,
          comments: t.comments,
        },
      ]);
    }
  }, [profile]);

  return (
    <>
      <Grid item xs={2} sm={4} lg={4}>
        <Banner />
      </Grid>
      <Grid item xs={8} sm={6} lg={5}>
        <Container>
          <Card className={classes.topCard}>
            <CardHeader
              title={
                <Typography
                  variant="h5"
                  className={classes.title}
                  style={{ paddingLeft: 12 }}
                  component="h3"
                >
                  Bookmarks
                </Typography>
              }
              subheader={
                <Typography
                  className={classes.subHeader}
                  style={{
                    paddingLeft: 12,
                  }}
                >
                  When You Save a chirp, it'll appear here
                </Typography>
              }
            />
          </Card>
          {tweets.length ? (
            tweets.map((tweet) =>
              tweet._id ? (
                <Card key={tweet._id} className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        G
                      </Avatar>
                    }
                    action={
                      <MoreBannerTweetOptions
                        tweetId={tweet._id}
                        tweets={tweets}
                        setTweets={setTweets}
                        authorID={tweet.authorID}
                      />
                    }
                    title={
                      <Typography variant="h5" className={classes.title} component="h3">
                        {tweet.name}
                      </Typography>
                    }
                    subheader={
                      <Typography
                        style={{
                          marginRight: "auto",
                          alignSelf: "flex-start",
                          textAlign: "left",
                          color: "#777",
                        }}
                      >
                        {timeConverter(tweet.date)}
                      </Typography>
                    }
                  />
                  {/* Hovering on tweet & go to the tweet on click */}
                  <CardActionArea
                    href={"/tweet/" + tweet._id}
                    // target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                        component="p"
                        style={{ textAlign: "left", color: "#fff" }}
                      >
                        {tweet.body}
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                  <CardActions disableSpacing>
                    <Grid container>
                      <Grid item xs={3}>
                        <MakeComment tweetId={tweet._id} />
                      </Grid>
                      <Grid item xs={3}>
                        <MakeSave tweetId={tweet._id} />
                      </Grid>
                      <Grid item xs={3}>
                        <MakeLike tweetId={tweet._id} />
                      </Grid>
                      <Grid item xs={3}>
                        <MakeSend tweetId={tweet._id} />
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              ) : null
            )
          ) : (
            <Card className={classes.topCard}>
              <CardContent>
                <Typography style={{ fontSize: 20 }}>
                  Sorry You do not have any Saved Chirps
                </Typography>
              </CardContent>
            </Card>
          )}
        </Container>
      </Grid>
    </>
  );
};

export default BookmarksPage;
