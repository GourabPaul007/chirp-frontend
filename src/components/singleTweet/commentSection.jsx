import React, { useContext } from "react";
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

const CommentSection = ({ replies }) => {
  const classes = useStyles();

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
