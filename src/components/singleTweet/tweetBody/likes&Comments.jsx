import React, { useContext } from "react";
import { TweetContext } from "../../../contexts/tweetContext";

import { Typography, CardContent, Grid, makeStyles } from "@material-ui/core";
import { CommentsContext } from "../../../contexts/commentsContext";

const useStyles = makeStyles((theme) => ({
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
}));

const LikesAndComments = () => {
  const classes = useStyles();

  const [tweet, setTweet] = useContext(TweetContext);
  const [comments, setComments] = useContext(CommentsContext);

  return (
    <>
      <CardContent className={classes.statusBlock}>
        <Grid container spacing={3}>
          <Grid item style={{ fontSize: 18, padding: 10, color: "#fff" }}>
            {tweet.likes ? tweet.likes.length : 0}{" "}
            <Typography className={classes.likesAndComments}>Likes</Typography>
          </Grid>
          <Grid item style={{ fontSize: 18, padding: 10, color: "#fff" }}>
            {comments.length - 1}{" "}
            <Typography className={classes.likesAndComments}>Comments</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
};

export default LikesAndComments;
