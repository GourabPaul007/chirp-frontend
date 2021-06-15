import React, { useContext, useEffect, useState } from "react";
import {
  makeStyles,
  Typography,
  IconButton,
  Avatar,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Divider,
  Grid,
} from "@material-ui/core";
import { useStyles_TweetBody } from "./_singleTweetStyles";

import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import RepeatIcon from "@material-ui/icons/Repeat";

import axios from "axios";

import { TweetContext } from "../../contexts/tweetContext";
import LikesAndComments from "./tweetBody/likes&Comments";
import TweetHeader from "./tweetBody/tweetHeader";

const TweetBody = ({ tweetId }) => {
  const classes = useStyles_TweetBody();

  const [tweet, setTweet] = useContext(TweetContext);

  console.log(tweet.likes.includes("paul"));

  const [liked, setLiked] = useState(tweet.likes.includes("paul"));

  // useEffect to set liked = true if liked by user at render
  useEffect(async () => {
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}/likes`);
    const likesArray = data.data;
    console.log(likesArray);
    setLiked(likesArray.includes("paul"));
  }, []);

  const handleLike = async () => {
    const URL = `http://localhost:5000/api/tweets/${tweetId}/updateLikes`;
    const id = tweetId;
    const name = "paul";
    await axios.post(URL, {
      id,
      name,
    });
    console.log(`${liked} request sent`);
    setLiked(!liked);

    // Getting tweet after updating the tweet, this problem took me 3 days, fml
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;
    setTweet({
      name: tweetData.name,
      date: tweetData.date,
      body: tweetData.body,
      likes: tweetData.likes,
      likesNumber: tweetData.likes.length,
      commentsNumber: tweetData.comments.length,
    });
  };

  return (
    <>
      {tweetId ? (
        <Card key={tweetId} className={classes.card}>
          {/* Tweet Header for name & date stuff */}
          <TweetHeader />
          {/* Body of the tweet */}
          <CardContent>
            <Typography variant="h6" component="p" className={classes.tweetBody}>
              {tweet.body} - This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels, if you
              like.
            </Typography>
          </CardContent>
          {/* ========================================= */}
          {/* Number of Likes & Comments for each tweet */}
          <LikesAndComments />
          {/* Tweet Actions such as likes & comments icons */}
          <CardActions disableSpacing>
            <Grid container>
              <Grid item xs={3}>
                <IconButton
                // onClick={handleLike}
                // style={{ color: liked ? "#2196F3" : "#6e767d" }}
                >
                  <CommentIcon />
                </IconButton>
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
                {/* <form onSubmit={handleLike}> */}
                <IconButton
                  aria-label="add to favorites"
                  onClick={handleLike}
                  style={{ color: liked ? "#2196F3" : "#6e767d" }}
                  // style={{ color: "#2196F3" }}
                >
                  <FavoriteIcon />
                </IconButton>
                {/* </form> */}
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
