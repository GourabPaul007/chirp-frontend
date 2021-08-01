import React, { useContext } from "react";
import { Typography, CardContent, Grid, makeStyles } from "@material-ui/core";

import { TweetContext } from "../../contexts/tweetContext";
import { CommentsContext } from "../../contexts/commentsContext";

const useStyles = makeStyles((theme) => ({
  // likes & comments view section border stuff
  statusBlock: {
    // border: "1px solid #2F3336",
    borderRadius: 10,
    marginTop: 6,
    marginLeft: 96,
    marginRight: 10,
  },
  likesAndComments: {
    margin: "auto",
    color: "#bbb",
    padding: 0,
    margin: 0,
  },
  eachItem: {
    display: "inline-block",
    fontSize: 18,
    color: "#777",
  },
}));

const LikesAndReplies = ({ comment }) => {
  const classes = useStyles();

  const [tweet, setTweet] = useContext(TweetContext);
  const [comments, setComments] = useContext(CommentsContext);

  return (
    <>
      {/* <CardContent className={classes.statusBlock}> */}
      <Grid container spacing={1} className={classes.statusBlock}>
        <Grid item className={classes.likesAndComments}>
          {comment.likes.length} <Typography className={classes.eachItem}>Likes</Typography>
        </Grid>
        <Grid item className={classes.likesAndComments}>
          {comments.length - 1} <Typography className={classes.eachItem}>Replies</Typography>
        </Grid>
      </Grid>
      {/* </CardContent> */}
    </>
  );
};

export default LikesAndReplies;
