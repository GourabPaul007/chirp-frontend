import React, { useContext, useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { IconButton, makeStyles, Typography } from "@material-ui/core";

import axios from "axios";
import { CommentsContext } from "../../contexts/commentsContext";

const useStyles = makeStyles({
  likeButton: {
    "&:hover": {
      backgroundColor: "#e0245e",
    },
    marginLeft: 50,
  },
});

const MakeCommentLike = ({ tweetId, comment }) => {
  const classes = useStyles();

  const [comments, setComments] = useContext(CommentsContext);
  // const [comment, setComment] = useContext(CommentContext);

  const [liked, setLiked] = useState(comment.likes.includes("paul"));
  console.log(comment.likes.includes("paul"));

  // useEffect to set liked = true if liked by user at render
  useEffect(async () => {
    const data = await axios.get(
      `http://localhost:5000/api/comments/${tweetId}/${comment.id}/likes`
    );
    const likesArray = data.data;
    console.log(likesArray);
    setLiked(likesArray.includes("paul"));
  }, []);

  const handleLike = async () => {
    const url = `http://localhost:5000/api/comments/${tweetId}/${comment.id}/updateCommentLikes`;
    const id = tweetId;
    const name = "paul";
    await axios.post(url, {
      id, //tweetId to check on backend if it matches in database
      name, //name to include in the likes array in backend
    });
    console.log(`${liked} request sent`);
    setLiked(!liked);

    // deleting comments temporary because key overlap
    setComments([{}]);

    // Getting tweet from server after updating the tweet
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;
    // getting comments from tweet data
    tweetData.comments.forEach((commentData) => {
      setComments((comments) => [
        ...comments,
        {
          id: commentData.id,
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
      <IconButton
        //  hover
        className={classes.likeButton}
        onClick={handleLike}
      >
        {liked ? (
          <FavoriteRoundedIcon style={{ color: "#e0245e" }} />
        ) : (
          <FavoriteBorderRoundedIcon style={{ color: "#6e767d" }} />
        )}
      </IconButton>
      <Typography style={{ display: "inline", color: "#fff" }}>{comment.likes.length}</Typography>
      <Typography style={{ display: "inline" }}> Likes</Typography>
    </>
  );
};

export default MakeCommentLike;
