import React, { useContext, useEffect, useState } from "react";

import {
  makeStyles,
  Typography,
  IconButton,
  Avatar,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  CardActionArea,
} from "@material-ui/core";
import axios from "axios";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import { TweetContext } from "../../../contexts/tweetContext";

const MakeSave = ({ tweetId }) => {
  const [tweet, setTweet] = useContext(TweetContext);
  const [saved, setSaved] = useState(tweet.saves.includes("paul"));

  // useEffect to set saved = true if liked by user at render
  useEffect(async () => {
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}/saves`);
    const savesArray = data.data;
    setSaved(savesArray.includes("paul"));
    console.log(tweet);
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
    console.log(tweet);

    // Getting tweet from server after updating the tweet
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;
    setTweet({
      id: tweetData.id,
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
      <IconButton onClick={handleSave}>
        {saved ? <BookmarkIcon style={{ color: "#17bf63" }} /> : <BookmarkBorderIcon />}
      </IconButton>
    </>
  );
};

export default MakeSave;
