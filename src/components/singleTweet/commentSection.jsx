import React, { useContext } from "react";
import { Box } from "@material-ui/core";

import { useStyles_CommentSection } from "../singleTweet/_singleTweetStyles";
import EachComment from "./commentSection/eachComment";
import { CommentsContext } from "../../contexts/commentsContext";

const CommentSection = ({ replies }) => {
  const classes = useStyles_CommentSection();

  const [comments, setComments] = useContext(CommentsContext);

  return (
    <>
      <Box className={classes.commentBox}>
        {comments.map((comment) =>
          comment.id ? (
            // this Box is a whole comment including all its replies
            <Box key={comment.id} className={classes.commentBox}>
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
