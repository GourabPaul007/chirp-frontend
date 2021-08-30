// Parent is App.js / Depends on the tweet URL
// Children are TweetBody & CommentSection

import React, { useContext, useEffect, useState, Suspense } from "react";
import {
  makeStyles,
  Container,
  CssBaseline,
  CircularProgress,
  Typography,
  Grid,
} from "@material-ui/core";
import axios from "axios";

import { useParams } from "react-router";
import TweetBody from "./singleTweet/tweetBody";
import { TweetContext } from "../contexts/tweetContext";
import { CommentsContext } from "../contexts/commentsContext";
import { RepliesContext } from "../contexts/repliesContext";
import Banner from "./banner";
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
      _id: t._id,
      name: t.name,
      username: t.username,
      authorID: t.authorID,
      date: t.date,
      body: t.body,
      likes: t.likes,
      saves: t.saves,
    });
    // setting the comments for tweet from fetched data from server
    if (t.comments) {
      t.comments.forEach((comment) => {
        setComments((comments) => [
          ...comments,
          {
            _id: comment._id,
            tweetId: comment.tweetId,
            name: comment.name,
            username: comment.username,
            authorID: comment.authorID,
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
            _id: reply._id,
            commentId: reply.commentId,
            tweetId: reply.tweetId,
            name: reply.name,
            username: reply.username,
            authorID: reply.authorID,
            date: reply.date,
            body: reply.body,
            likes: reply.likes,
          },
        ]);
      });
    }
  }, []);

  return (
    <>
      <Grid item xs={2} sm={4} lg={4}>
        <Banner />
      </Grid>
      <Grid item xs={8} sm={6} lg={5}>
        {tweet._id ? (
          <Container className={classes.rootSingleTweet}>
            <TweetBody tweet={tweet} setTweet={setTweet} tweetId={tweetId} />
            {/* Render Comments if they exists */}
            {comments.length > 1 ? (
              <Suspense
                fallback={
                  <div>
                    <CircularProgress color="primary" />
                  </div>
                }
              >
                <CommentSection tweetId={tweetId} />
              </Suspense>
            ) : null}
          </Container>
        ) : (
          <>
            <Typography>This Tweet Have Been Deleted</Typography>
          </>
        )}
      </Grid>
    </>
  );
};

export default SingleTweet;
