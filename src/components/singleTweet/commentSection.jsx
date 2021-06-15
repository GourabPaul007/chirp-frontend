import React from "react";
import {
  makeStyles,
  Typography,
  Box,
  IconButton,
  Avatar,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  TextField,
  DialogActions,
  Button,
  Container,
  Grid,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import RepeatIcon from "@material-ui/icons/Repeat";
import ReplySection from "./commentSection/replies";

import { useStyles_CommentSection } from "../singleTweet/_singleTweetStyles";
import EachComment from "./commentSection/eachComment";

const CommentSection = ({ comments, replies }) => {
  const classes = useStyles_CommentSection();

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
              <ReplySection replies={replies} comment={comment} />
            </Box>
          ) : null
        )}
      </Box>
    </>
  );
};

export default CommentSection;
