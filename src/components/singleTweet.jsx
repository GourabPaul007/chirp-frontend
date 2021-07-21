// Parent is App.js / Depends on the tweet URL
// Children are TweetBody & CommentSection

import React, { useContext, useEffect, useState, Suspense } from "react";
import { makeStyles, Container, CssBaseline } from "@material-ui/core";
import axios from "axios";

import { useParams } from "react-router";
import TweetBody from "./singleTweet/tweetBody";
import { TweetContext } from "../contexts/tweetContext";
import { CommentsContext } from "../contexts/commentsContext";
import { RepliesContext } from "../contexts/repliesContext";
const CommentSection = React.lazy(() => import("./singleTweet/commentSection"));

const useStyles = makeStyles((theme) => ({
  rootSingleTweet: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      // marginRight: 8,
      paddingLeft: 0,
      paddingRight: 8,
    },
    [theme.breakpoints.up("md")]: {
      // maxWidth: 800,
    },
    marginTop: 0,
    paddingTop: 0,
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
    const t = data.data;
    console.log(t);

    // setting state of tweet from fetched data from server
    setTweet({
      name: t.name,
      username: t.username,
      date: t.date,
      body: t.body,
      likes: t.likes,
      saves: t.saves,
      comments: t.comments,
    });
    console.log(tweet);
    // setting the comments for tweet from fetched data from server
    if (t.comments) {
      t.comments.forEach((comment) => {
        setComments((comments) => [
          ...comments,
          {
            id: comment.id,
            tweetId: comment.tweetId,
            name: comment.name,
            username: comment.username,
            date: comment.date,
            body: comment.body,
            likes: comment.likes,
          },
        ]);
      });
    }
    // Setting the replies for each comment
    if (t.replies) {
      t.replies.forEach((reply) => {
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
    <Container className={classes.rootSingleTweet}>
      <TweetBody tweet={tweet} setTweet={setTweet} tweetId={tweetId} />
      {/* Render Comments if they exists */}
      {comments.length > 1 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <CommentSection tweetId={tweetId} replies={replies} />
        </Suspense>
      ) : null}
    </Container>
  );
};

export default SingleTweet;
