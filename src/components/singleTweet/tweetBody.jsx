import React, { useContext, useState } from "react";
import { Typography, IconButton, Card, CardContent, CardActions, Grid } from "@material-ui/core";
import { useStyles_TweetBody } from "./_singleTweetStyles";

import { TweetContext } from "../../contexts/tweetContext";
import LikesAndComments from "./tweetBody/likes&Comments";
import TweetHeader from "./tweetBody/tweetHeader";
import MakeComment from "./tweetBody/makeComment";
import MakeLike from "./tweetBody/makeLike";
import MakeSave from "./tweetBody/makeSave";
import MakeSend from "./tweetBody/makeSend";

const TweetBody = ({ tweetId }) => {
  const classes = useStyles_TweetBody();

  const [tweet, setTweet] = useContext(TweetContext);

  return (
    <>
      {tweetId ? (
        <Card key={tweetId} className={classes.card}>
          {/* Tweet Header for name & date stuff */}
          <TweetHeader />

          <CardContent>
            <Typography variant="h6" component="p" className={classes.tweetBody}>
              {tweet.body} - This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels, if you
              like.
            </Typography>
          </CardContent>

          {/* Number of Likes & Comments for each tweet */}
          <LikesAndComments />

          {/* Tweet Actions such as likes & comments icons */}
          <CardActions disableSpacing>
            <Grid container>
              <Grid item xs={3}>
                <MakeComment tweetId={tweetId} /> {/*Comment Component to Make Comment*/}
              </Grid>
              <Grid item xs={3}>
                <MakeSave tweetId={tweetId} />
              </Grid>
              <Grid item xs={3}>
                <MakeLike tweetId={tweetId} />
              </Grid>
              <Grid item xs={3}>
                <MakeSend />
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      ) : null}
    </>
  );
};

export default TweetBody;
