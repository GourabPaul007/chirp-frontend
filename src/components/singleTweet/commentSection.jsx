import React, { useContext, useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";

import { CommentsContext } from "../../contexts/commentsContext";

import EachComment from "./commentSection/eachComment";
import ReplySection from "./commentSection/replies";

const useStyles = makeStyles({
  commentSection: {
    margin: "auto",
    border: "1px solid #777",
    borderRadius: 15,
  },
  wholeCommentWithReplies: {
    borderBottom: "1px solid #777",
  },
});

const CommentSection = ({ replies, tweetId }) => {
  const classes = useStyles();

  const [comments, setComments] = useContext(CommentsContext);

  // const [comment, setComment] = useContext(CommentContext);

  useEffect(async () => {
    // const URL = "http://localhost:5000/api/tweets";
    // const data = await axios.get(URL);
    // for (let i = 0; i < data.data.length; i++) {
    //   //element is a tweet object i.e. its the whole tweet
    //   let element = data.data[i];
    //   setTweets(
    //     {
    //       id: element.id,
    //       name: element.name,
    //       username: element.username,
    //       body: element.body,
    //       date: element.date,
    //       likes: element.likes,
    //       saves: element.saves,
    //       comments: element.comments,
    //     },
    //   );
    // }
  }, []);

  return (
    <>
      <Box className={classes.commentSection}>
        {comments.map((comment) =>
          comment.id ? (
            // this Box is a whole comment including all its replies
            <Box key={comment.id} className={classes.wholeCommentWithReplies}>
              {/* this card is the main comment */}
              <EachComment tweetId={tweetId} comment={comment} />
              {/* Replies for the comment if exists */}
              {/* <ReplySection replies={replies} comment={comment} /> */}
            </Box>
          ) : null
        )}
      </Box>
    </>
  );
};

export default CommentSection;
