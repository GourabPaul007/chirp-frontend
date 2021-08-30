import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import { IconButton } from "@material-ui/core";
import axios from "axios";
import { CommentsContext } from "../../contexts/commentsContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const MakeComment = ({ tweetId }) => {
  const [comments, setComments] = useContext(CommentsContext);

  const [open, setOpen] = useState(false);

  // const [commenter, setCommenter] = useState(null);
  const [commentBody, setCommentBody] = useState(null);
  const [profile, setProfile] = useContext(ProfileContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCommentPost = async (e) => {
    setOpen(false);
    const URL = `http://localhost:5000/api/comments/${tweetId}/newComment`;
    // Setting stuff to send in post request
    const name = profile.name;
    const username = profile.username;
    const uid = profile.uid;
    const body = commentBody;
    const newComment = await axios.post(URL, {
      tweetId,
      name,
      username,
      uid,
      body,
      // date: is set in Server
    });

    // adding new comment to frontend after creating it in backend, so it wont have to fetch server again
    const newComments = JSON.parse(JSON.stringify(comments));
    console.log(newComment.data);
    newComments.push(newComment.data);
    setComments(newComments);
  };

  return (
    <>
      <IconButton variant="outlined" onClick={handleClickOpen} style={{ color: "#6e767d" }}>
        <ChatBubbleOutlineRoundedIcon />
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
            autoFocus
            margin="dense"
            id="comment"
            fullWidth
            multiline
            placeholder="Comment"
            onChange={(e) => setCommentBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCommentPost} color="primary">
            Comment
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MakeComment;
