// News Feed MakeLike

import React, { useContext, useEffect, useState } from "react";

import { IconButton, makeStyles } from "@material-ui/core";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

import axios from "axios";
import { TweetContext } from "../../../contexts/tweetContext";

const useStyles = makeStyles({
  likeButton: {
    "&:hover": {
      color: "#e0245e",
      backgroundColor: "#e0245e",
    },
  },
});

const MakeLike = ({ tweetId }) => {
  const classes = useStyles();

  const [tweet, setTweet] = useContext(TweetContext);
  const [liked, setLiked] = useState(tweet.likes.includes("paul"));
  console.log(tweet.likes.includes("paul"));

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
      id, //tweetId to check on backend if it matches in database
      name, //name to include in the likes array in backend
    });
    setLiked(!liked);
    console.log(tweet);

    // Getting tweet from server after updating the tweet, this problem took me 3 days, fml
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;
    setTweet({
      name: tweetData.name,
      date: tweetData.date,
      body: tweetData.body,
      likes: tweetData.likes,
      saves: tweetData.saves,
      comments: tweetData.comments,
    });
  };

  return (
    <>
      <IconButton
        hover
        className={classes.likeButton}
        aria-label="add to favorites"
        onClick={handleLike}
      >
        {liked ? (
          <FavoriteRoundedIcon style={{ color: "#e0245e" }} />
        ) : (
          <FavoriteBorderRoundedIcon style={{ color: "#6e767d" }} />
        )}
      </IconButton>
    </>
  );
};

export default MakeLike;
