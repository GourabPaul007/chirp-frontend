import React, { useContext, useEffect, useState } from "react";

import { makeStyles, IconButton } from "@material-ui/core";
import axios from "axios";
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@material-ui/icons/BookmarkRounded";
import { TweetContext } from "../../contexts/tweetContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const useStyles = makeStyles({
  saveButton: {
    "&:hover": {
      backgroundColor: "#17bf63",
    },
  },
});

const MakeSave = ({ tweetId }) => {
  const classes = useStyles();

  const [profile, setProfile] = useContext(ProfileContext);

  const [tweet, setTweet] = useContext(TweetContext);
  const [saved, setSaved] = useState(tweet.saves.includes(profile.uid));

  // useEffect to set saved = true if liked by user at render
  useEffect(async () => {
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}/saves`);
    const savesArray = data.data;
    setSaved(savesArray.includes(profile.uid));
  }, [profile]);

  const handleSave = async () => {
    const URL = `http://localhost:5000/api/tweets/${tweetId}/updateSaves`;
    const uid = profile.uid;
    await axios.post(URL, { uid });
    setSaved(!saved);

    // Getting tweet from server after updating the tweet
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
        className={classes.saveButton}
        onClick={handleSave}
      >
        {saved ? (
          <BookmarkRoundedIcon style={{ color: "#17bf63" }} />
        ) : (
          <BookmarkBorderRoundedIcon style={{ color: "#6e767d" }} />
        )}
      </IconButton>
    </>
  );
};

export default MakeSave;
