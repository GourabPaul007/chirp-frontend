import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CommentIcon from "@material-ui/icons/Comment";
import { IconButton, makeStyles } from "@material-ui/core";
import axios from "axios";
import { TweetContext } from "../../../contexts/tweetContext";
import { CommentsContext } from "../../../contexts/commentsContext";

const useStyles = makeStyles((theme) => ({
  button: {
    // marginLeft: "auto",
    marginRight: 10,
    color: "#fff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 20,
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 16,
  },
}));

const MakeComment = ({ tweetId }) => {
  const classes = useStyles();

  // Getting Tweet Context
  const [tweet, setTweet] = useContext(TweetContext);
  const [comments, setComments] = useContext(CommentsContext);

  const [open, setOpen] = useState(false);

  const [commenter, setCommenter] = useState(null);
  const [commentBody, setCommentBody] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCommentPost = async (e) => {
    setOpen(false);
    const URL = `http://localhost:5000/api/tweets/${tweetId}/newComment`;
    // Setting stuff to send in post request
    const name = commenter;
    const body = commentBody;
    await axios.post(URL, {
      // things that will be set to server to save
      tweetId,
      name,
      body,
      // date: is set in Server
    });

    // clearing comments data so it does not stack & have key errors
    await setComments([]);
    console.log(comments);

    // Getting tweet from server after updating the Comments
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;
    console.log(tweetData);

    tweetData.comments.forEach((comment) => {
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
    console.log(comments);
  };

  return (
    <>
      <IconButton
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        // style={{ color: liked ? "#2196F3" : "#6e767d" }}
      >
        <CommentIcon />
      </IconButton>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        // maxWidth="xl"
      >
        {/* Dialog Box to make a comment in */}
        <DialogTitle id="form-dialog-title">Make A Comment</DialogTitle>
        <DialogContent style={{ minWidth: 600, minHeight: 70 }}>
          <TextField
            margin="dense"
            id="name"
            fullWidth
            placeholder="Name"
            onChange={(e) => setCommenter(e.target.value)}
          />
          <TextField
            margin="dense"
            id="comment"
            fullWidth
            multiline
            placeholder="Comment"
            onChange={(e) => setCommentBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className={classes.button}
            style={{ background: "#D32F2F" }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCommentPost}
            className={classes.button}
            style={{ background: "#2196F3" }}
          >
            Comment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MakeComment;
