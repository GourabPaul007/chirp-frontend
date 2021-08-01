import React, { useContext, useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { IconButton, makeStyles, Typography, Button } from "@material-ui/core";

import axios from "axios";
import { CommentsContext } from "../../contexts/commentsContext";
import { TweetContext } from "../../contexts/tweetContext";
import { RepliesContext } from "../../contexts/repliesContext";

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

const MakeReplyLike = ({ reply, tweetId, comment }) => {
  const classes = useStyles();

  const [replies, setReplies] = useContext(RepliesContext);
  const [tweet, setTweet] = useContext(TweetContext);
  // const [comment, setComment] = useContext(CommentContext);

  const [liked, setLiked] = useState(reply.likes.includes("paul"));

  // useEffect to set liked = true if liked by user at render
  useEffect(async () => {
    const data = await axios.get(`http://localhost:5000/api/replies/${tweetId}/${reply._id}/likes`);
    const likesArray = data.data;
    setLiked(likesArray.includes("paul"));
  }, []);

  const handleLike = async () => {
    const url = `http://localhost:5000/api/replies/${tweetId}/${reply._id}/updateReplyLikes`;
    const _id = tweetId;
    const name = "paul";
    await axios.post(url, {
      _id, //tweetId to check on backend if it matches in database
      name, //name to include in the likes array in backend
    });
    setLiked(!liked);

    // deleting replies temporary because key overlap
    // setReplies([{}]);

    // Getting tweet from server after updating the tweet
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;

    // getting replies from tweet data and setting replies data after updating
    tweetData.replies.forEach((replyData) => {
      setReplies((replies) => [
        ...replies,
        {
          _id: replyData._id,
          tweetId: replyData.tweetId,
          name: replyData.name,
          username: replyData.username,
          date: replyData.date,
          body: replyData.body,
          likes: replyData.likes,
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
    </>
  );
};

export default MakeReplyLike;
