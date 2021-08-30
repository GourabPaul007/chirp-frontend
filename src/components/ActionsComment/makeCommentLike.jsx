import React, { useContext, useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { IconButton, makeStyles, Typography, Button } from "@material-ui/core";

import axios from "axios";
import { CommentsContext } from "../../contexts/commentsContext";
import { TweetContext } from "../../contexts/tweetContext";
import { ProfileContext } from "../../contexts/ProfileContext";

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
  const [profile, setProfile] = useContext(ProfileContext);

  const [liked, setLiked] = useState(comment.likes.includes(profile.uid));

  // useEffect to set liked or not by user at render
  useEffect(async () => {
    const data = await axios.get(`http://localhost:5000/api/comments/${comment._id}/likes`);
    const likesArray = data.data;
    setLiked(likesArray.includes(profile.uid));
  }, [profile]);

  const handleLike = async () => {
    const url = `http://localhost:5000/api/comments/${comment._id}/updateCommentLikes`;
    const uid = profile.uid;
    //uid to include in the likes array in backend
    await axios.post(url, { uid });
    setLiked(!liked);

    // deleting comments temporary because key overlap
    setComments([{}]);

    // Getting tweet from server after updating the tweet
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;

    // getting comments from tweet data and setting comments data after updating
    tweetData.comments.forEach((c) => {
      setComments((comments) => [
        ...comments,
        {
          _id: c._id,
          tweetId: c.tweetId,
          name: c.name,
          authorID: c.authorID,
          username: c.username,
          date: c.date,
          body: c.body,
          likes: c.likes,
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
