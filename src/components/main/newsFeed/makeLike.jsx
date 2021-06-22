// News Feed MakeLike

import React, { useContext, useEffect, useState } from "react";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { TweetContext } from "../../../contexts/tweetContext";

const MakeLike = ({ tweetId }) => {
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
        aria-label="add to favorites"
        onClick={handleLike}
        style={{ color: liked ? "#2196F3" : "#6e767d" }}
      >
        <FavoriteIcon />
      </IconButton>
    </>
  );
};

export default MakeLike;
