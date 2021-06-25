import React, { useContext } from "react";
import { Box } from "@material-ui/core";

import { useStyles_CommentSection } from "../singleTweet/_singleTweetStyles";

import { CommentsContext } from "../../contexts/commentsContext";

import EachComment from "./commentSection/eachComment";
import ReplySection from "./commentSection/replies";

const CommentSection = ({ replies }) => {
  const classes = useStyles_CommentSection();

  const [comments, setComments] = useContext(CommentsContext);

  return (
    <>
      <Box className={classes.commentSection}>
        {comments.map((comment) =>
          comment.id ? (
            // this Box is a whole comment including all its replies
            <Box key={comment.id} className={classes.wholeCommentWithReplies}>
              {/* this card is the main comment */}
              <EachComment comment={comment} />
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
