import React, { useContext, useEffect, useState } from "react";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import { IconButton, makeStyles } from "@material-ui/core";

import axios from "axios";
import { TweetContext } from "../../contexts/tweetContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const useStyles = makeStyles({
  likeButton: {
    "&:hover": {
      backgroundColor: "#e0245e",
    },
  },
});

const MakeLike = ({ tweetId }) => {
  const classes = useStyles();

  const [profile, setProfile] = useContext(ProfileContext);

  const [tweet, setTweet] = useContext(TweetContext);
  const [liked, setLiked] = useState(tweet.likes.includes(profile.uid));

  // useEffect to set liked = true if liked by user at render
  useEffect(async () => {
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}/likes`);
    const likesArray = data.data;
    setLiked(likesArray.includes(profile.uid));
  }, [profile]);

  const handleLike = async () => {
    const URL = `http://localhost:5000/api/tweets/${tweetId}/updateLikes`;
    const uid = profile.uid;
    const newTweet = await axios.post(URL, { uid });
    setLiked(!liked);

    // Getting tweet from server after updating the tweet, this problem took me 3 days, fml
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const t = data.data;
    setTweet((tweet) => ({
      ...tweet,
      _id: t._id,
      name: t.name,
      username: t.username,
      authorID: t.authorID,
      date: t.date,
      body: t.body,
      likes: t.likes,
      saves: t.saves,
      comments: t.comments,
    }));
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
    </>
  );
};

export default MakeLike;
