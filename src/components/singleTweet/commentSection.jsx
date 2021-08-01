import React, { useContext, useEffect } from "react";
import { Box, makeStyles } from "@material-ui/core";

import { CommentsContext } from "../../contexts/commentsContext";

import EachComment from "./commentSection/eachComment";
import ReplySection from "./commentSection/replies";
import { TweetContext } from "../../contexts/tweetContext";
import { RepliesContext } from "../../contexts/repliesContext";

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

const CommentSection = ({ tweetId }) => {
  const classes = useStyles();

  const [comments, setComments] = useContext(CommentsContext);
  const [tweet, setTweet] = useContext(TweetContext);

  return (
    <>
      <Box className={classes.commentSection}>
        {comments.map((comment) =>
          comment._id ? (
            // this Box is a whole comment including all its replies
            <Box key={comment._id} className={classes.wholeCommentWithReplies}>
              {/* this card is the main comment */}
              <EachComment tweetId={tweetId} comment={comment} />
              {/* Replies for the comment if exists */}
              <ReplySection tweetId={tweetId} comment={comment} />
            </Box>
          ) : null
        )}
      </Box>
    </>
  );
};

export default CommentSection;
