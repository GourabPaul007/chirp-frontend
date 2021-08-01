import React, { useContext } from "react";
import { Typography, Card, CardContent, CardActions, Grid, makeStyles } from "@material-ui/core";

import { TweetContext } from "../../contexts/tweetContext";

import GoBack from "./tweetBody/goBack";
import TweetHeader from "./tweetBody/tweetHeader";
import LikesAndComments from "./tweetBody/likes&Comments";
import MakeComment from "../ActionsTweet/makeComment";
import MakeSave from "../ActionsTweet/makeSave";
import MakeLike from "../ActionsTweet/makeLike";
import MakeSend from "../ActionsTweet/makeSend";

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
}));

const TweetBody = ({ tweetId }) => {
  const classes = useStyles();

  const [tweet, setTweet] = useContext(TweetContext);

  return (
    <>
      {tweetId ? (
        <Card key={tweetId} className={classes.card}>
          {/* Back button at the top of tweet header */}
          <GoBack />

          {/* Tweet Header for name & date stuff */}
          <TweetHeader tweetId={tweetId} />

          <CardContent>
            <Typography variant="h6" component="p" className={classes.tweetBody}>
              {tweet.body}
            </Typography>
          </CardContent>

          {/* Number of Likes & Comments for each tweet */}
          <LikesAndComments />

          {/* Tweet Actions such as likes & comments icons */}
          <CardActions disableSpacing>
            <Grid container>
              <Grid item xs={3}>
                <MakeComment tweetId={tweetId} /> {/*Comment Component*/}
              </Grid>
              <Grid item xs={3}>
                <MakeSave tweetId={tweetId} /> {/*Save Component */}
              </Grid>
              <Grid item xs={3}>
                <MakeLike tweetId={tweetId} /> {/*Like Component */}
              </Grid>
              <Grid item xs={3}>
                <MakeSend tweetId={tweetId} /> {/*Share Component */}
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      ) : null}
    </>
  );
};

export default TweetBody;
