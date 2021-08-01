import React, { useContext, useState } from "react";
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

  const [open, setOpen] = useState(false);

  const [replier, setReplier] = useState(null);
  const [replyBody, setReplyBody] = useState(null);

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
    const name = replier;
    const username = replier;
    const body = replyBody;
    await axios.post(URL, {
      tweetId,
      commentId,
      name, //name to include in the reply array in backend
      username,
      body, //reply body to include in the reply array in backend
      // date: is set in Server
    });

    // clearing Replies data so it does not stack & have key errors
    await setReplies([]);

    // Getting tweet from server after updating the Replies
    const data = await axios.get(`http://localhost:5000/api/tweets/${tweetId}`);
    const tweetData = data.data;

    tweetData.replies.forEach((reply) => {
      setReplies((replies) => [
        ...replies,
        {
          _id: reply._id,
          tweetId: reply.tweetId,
          name: reply.name,
          username: reply.username,
          date: reply.date,
          body: reply.body,
          likes: reply.likes,
        },
      ]);
    });
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
            margin="dense"
            id="name"
            fullWidth
            placeholder="Name"
            onChange={(e) => setReplier(e.target.value)}
          />
          <TextField
            margin="dense"
            id="Reply"
            fullWidth
            multiline
            placeholder="Reply"
            onChange={(e) => setReplyBody(e.target.value)}
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
