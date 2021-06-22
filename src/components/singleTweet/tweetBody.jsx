import React, { useContext, useState } from "react";
import { Typography, IconButton, Card, CardContent, CardActions, Grid } from "@material-ui/core";
import { useStyles_TweetBody } from "./_singleTweetStyles";

import ShareIcon from "@material-ui/icons/Share";
import RepeatIcon from "@material-ui/icons/Repeat";

import axios from "axios";

import { TweetContext } from "../../contexts/tweetContext";
import LikesAndComments from "./tweetBody/likes&Comments";
import TweetHeader from "./tweetBody/tweetHeader";
import MakeComment from "./tweetBody/makeComment";
import MakeLike from "./tweetBody/makeLike";

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
                <IconButton
                  aria-label="share"
                  // onClick={handleLike}
                  // style={{ color: liked ? "#2196F3" : "#6e767d" }}
                >
                  <RepeatIcon />
                </IconButton>
              </Grid>
              <Grid item xs={3}>
                <MakeLike tweetId={tweetId} />
              </Grid>
              <Grid item xs={3}>
                <form>
                  <IconButton
                    aria-label="share"
                    // onClick={handleLike}
                    // style={{ color: liked ? "#2196F3" : "#6e767d" }}
                  >
                    <ShareIcon />
                  </IconButton>
                </form>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      ) : null}
    </>
  );
};

export default TweetBody;
