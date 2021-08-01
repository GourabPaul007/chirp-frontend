import React, { useContext, useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { IconButton, makeStyles, Typography, Button } from "@material-ui/core";

import axios from "axios";
import { CommentsContext } from "../../contexts/commentsContext";
import { TweetContext } from "../../contexts/tweetContext";

const useStyles = makeStyles({
  likeButton: {
    "&:hover": {
      // backgroundColor: "#e0245e",
    },
    // marginLeft: 50,
    textTransform: "none",
  },
  iconText: {
    fontSize: 16,
    display: "inline-block",
    marginLeft: 8,
    color: "#777",
    fontWeight: "bold",
  },
});

const MakeCommentLike = ({ tweetId, comment }) => {
  const classes = useStyles();

  const [comments, setComments] = useContext(CommentsContext);
  const [tweet, setTweet] = useContext(TweetContext);
  // const [comment, setComment] = useContext(CommentContext);

  const [liked, setLiked] = useState(comment.likes.includes("paul"));

  // useEffect to set liked = true if liked by user at render
  useEffect(async () => {
    const data = await axios.get(`http://localhost:5000/api/comments/${comment._id}/likes`);
    const likesArray = data.data;
    setLiked(likesArray.includes("paul"));
  }, []);

  const handleLike = async () => {
    const url = `http://localhost:5000/api/comments/${comment._id}/updateCommentLikes`;
    const id = tweetId;
    const name = "paul";
    await axios.post(url, {
      // id, //tweetId to check on backend if it matches in database
      name, //name to include in the likes array in backend
    });
    setLiked(!liked);

    // deleting comments temporary because key overlap
    setComments([{}]);

    // Getting tweet from server after updating the tweet
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;

    // getting comments from tweet data and setting comments data after updating
    tweetData.comments.forEach((commentData) => {
      setComments((comments) => [
        ...comments,
        {
          _id: commentData._id,
          tweetId: commentData.tweetId,
          name: commentData.name,
          username: commentData.username,
          date: commentData.date,
          body: commentData.body,
          likes: commentData.likes,
        },
      ]);
    });
  };

  return (
    <>
      <Button
        //  hover
        fullWidth
        className={classes.likeButton}
        onClick={handleLike}
      >
        {liked ? (
          <>
            <FavoriteRoundedIcon style={{ color: "#e0245e" }} />
            <Typography className={classes.iconText}>Unlike</Typography>
          </>
        ) : (
          <>
            <FavoriteBorderRoundedIcon style={{ color: "#6e767d" }} />
            <Typography className={classes.iconText}>Like</Typography>
          </>
        )}
      </Button>

      {/* <Typography style={{ display: "inline", color: "#fff" }}>{comment.likes.length}</Typography>
      <Typography style={{ display: "inline" }}> Likes</Typography> */}
    </>
  );
};

export default MakeCommentLike;
