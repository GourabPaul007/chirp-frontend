import React, { useContext, useEffect, useState } from "react";

import { makeStyles, IconButton } from "@material-ui/core";
import axios from "axios";
import BookmarkBorderRoundedIcon from "@material-ui/icons/BookmarkBorderRounded";
import BookmarkRoundedIcon from "@material-ui/icons/BookmarkRounded";
import { TweetContext } from "../../contexts/tweetContext";

const useStyles = makeStyles({
  saveButton: {
    "&:hover": {
      backgroundColor: "#17bf63",
    },
  },
});

const MakeSave = ({ tweetId }) => {
  const classes = useStyles();

  const [tweet, setTweet] = useContext(TweetContext);
  const [saved, setSaved] = useState(tweet.saves.includes("paul"));

  // useEffect to set saved = true if liked by user at render
  useEffect(async () => {
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}/saves`);
    const savesArray = data.data;
    setSaved(savesArray.includes("paul"));
  }, []);

  const handleSave = async () => {
    const URL = `http://localhost:5000/api/tweets/${tweetId}/updateSaves`;
    const id = tweetId;
    const name = "paul";
    await axios.post(URL, {
      // Stuff to send to server on clicking save button
      id,
      name,
    });
    setSaved(!saved);

    // Getting tweet from server after updating the tweet
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;
    setTweet({
      id: tweetData.id,
      name: tweetData.name,
      username: tweetData.username,
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
