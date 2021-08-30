import React, { useContext, useRef, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import { Button, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { CommentsContext } from "../../contexts/commentsContext";
import { RepliesContext } from "../../contexts/repliesContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const useStyles = makeStyles({
  iconText: {
    fontSize: 16,
    textTransform: "none",
    display: "inline-block",
    marginLeft: 8,
    color: "#777",
    fontWeight: "bold",
  },
});

const MakeCommentReply = ({ tweetId, comment }) => {
  const classes = useStyles();

  const [replies, setReplies] = useContext(RepliesContext);
  const [profile, setProfile] = useContext(ProfileContext);

  const [open, setOpen] = useState(false);

  // const [replier, setReplier] = useState(null);
  const replyBody = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleReply = async (e) => {
    setOpen(false);
    const commentId = comment._id;
    const URL = `http://localhost:5000/api/replies/${tweetId}/${commentId}/newReply`;
    // Setting stuff to send in post request
    const name = profile.name;
    const username = profile.username;
    const uid = profile.uid;
    console.log(profile.uid);
    const body = replyBody.current.value;
    const newReply = await axios.post(URL, {
      tweetId,
      commentId,
      name,
      username,
      uid,
      body,
      // date: is set in Server
    });

    // adding new reply to frontend after creating it in backend, so it wont have to fetch server again
    const newReplies = JSON.parse(JSON.stringify(replies));
    newReplies.push(newReply.data);
    await setReplies(newReplies);
  };

  return (
    <>
      <Button
        // variant="outlined"
        fullWidth
        onClick={handleClickOpen}
        style={{ color: "#6e767d", marginLeft: 4 }}
      >
        <ChatBubbleOutlineRoundedIcon />
        <Typography className={classes.iconText}>Reply</Typography>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        {/* Dialog Box to make a Reply in */}
        <DialogTitle id="form-dialog-title">Make A Reply</DialogTitle>
        <DialogContent style={{ minWidth: 600, minHeight: 70 }}>
          <TextField
            autoFocus
            margin="dense"
            id="Reply"
            fullWidth
            multiline
            placeholder="Reply"
            inputRef={replyBody}
            // onChange={(e) => setReplyBody(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReply} color="primary">
            Reply
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MakeCommentReply;
