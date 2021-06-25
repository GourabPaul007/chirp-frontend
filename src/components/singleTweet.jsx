// Parent is App.js / Depends on the tweet URL
// Children are TweetBody & CommentSection

import React, { useContext, useEffect, useState } from "react";
import { makeStyles, Container } from "@material-ui/core";
import axios from "axios";

import { useParams } from "react-router";
import TweetBody from "./singleTweet/tweetBody";
import CommentSection from "./singleTweet/commentSection";
import { TweetContext } from "../contexts/tweetContext";
import { CommentsContext } from "../contexts/commentsContext";
import { RepliesContext } from "../contexts/repliesContext";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 800,
    },
    minWidth: 400,
    margin: "auto",
    // border: "1px solid #777",
    // display: "flex",
  },
}));

const SingleTweet = () => {
  const classes = useStyles();
  const { tweetId } = useParams();

  // Importing Contexts
  const [tweet, setTweet] = useContext(TweetContext);
  const [comments, setComments] = useContext(CommentsContext);
  const [replies, setReplies] = useContext(RepliesContext);

  useEffect(async () => {
    const URL = `http://localhost:5000/api/tweets/${tweetId}`;
    const data = await axios.get(URL); //fetching the tweet from url
    const tweet = data.data;

    // setting state of tweet from fetched data from server
    setTweet({
      name: tweet.name,
      username: tweet.username,
      date: tweet.date,
      body: tweet.body,
      likes: tweet.likes,
      saves: tweet.saves,
      comments: tweet.comments,
    });
    console.log(tweet);
    // setting the comments for tweet from fetched data from server
    tweet.comments.forEach((comment) => {
      setComments((comments) => [
        ...comments,
        {
          id: comment.id,
          tweetId: comment.tweetId,
          name: comment.name,
          date: comment.date,
          body: comment.body,
          likes: comment.likes,
        },
      ]);
    });
    // Setting the replies for each comment
    if (tweet.replies) {
      tweet.replies.forEach((reply) => {
        //had a freakin typo waste a day, its forEach not foreach
        setReplies((replies) => [
          ...replies,
          {
            id: reply.id,
            commentId: reply.commentId,
            name: reply.name,
            date: reply.date,
            body: reply.body,
            likes: reply.likes,
          },
        ]);
      });
    }
  }, []);

  return (
    <Container border={1} className={classes.root}>
      <TweetBody tweet={tweet} setTweet={setTweet} tweetId={tweetId} />
      <CommentSection replies={replies} />
    </Container>
  );
};

export default SingleTweet;
