import React, { useContext } from "react";
import { TweetContext } from "../../../contexts/tweetContext";

import { Typography, CardContent, Grid } from "@material-ui/core";
import { useStyles_TweetBody } from "../_singleTweetStyles";

const LikesAndComments = () => {
  const classes = useStyles_TweetBody();

  const [tweet, setTweet] = useContext(TweetContext);

  return (
    <>
      <CardContent className={classes.statusBlock}>
        <Grid container spacing={3}>
          <Grid item style={{ fontSize: 18, padding: 10 }}>
            {tweet.likes.length} <Typography className={classes.likesAndComments}>Likes</Typography>
          </Grid>
          <Grid item style={{ fontSize: 18, padding: 10 }}>
            {tweet.commentsNumber}{" "}
            <Typography className={classes.likesAndComments}>Comments</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

export default LikesAndComments;
