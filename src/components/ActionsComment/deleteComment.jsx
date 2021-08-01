import React, { useContext } from "react";
import { Select, Grid, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import { TweetContext } from "../../contexts/tweetContext";
import { CommentsContext } from "../../contexts/commentsContext";

const DeleteComment = ({ commentId }) => {
  const [comments, setComments] = useContext(CommentsContext);

  const indexOfObject = (newComments, commentId) => {
    for (let i = 0; i < newComments.length; i++) {
      if (newComments[i]._id == commentId) {
        return i;
      }
    }
  };

  // Delete Comment
  const handleDeleteComment = async (commentId) => {
    console.log(commentId);
    const url = `http://localhost:5000/api/comments/${commentId}/deleteComment`;
    await axios.post(url);
    // handleClose();

    // need to remove the reply that deleted from local state
    const newComments = JSON.parse(JSON.stringify(comments));
    console.log(newComments);
    newComments.splice(indexOfObject(newComments, commentId), 1);
    console.log(newComments);
    setComments(newComments);
  };

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        IconComponent={MoreVertIcon}
        disableUnderline
        autoWidth
        style={{ marginRight: 12, marginTop: 6, background: "#000" }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Button
              fullWidth
              style={{
                background: "#F44336",
                textTransform: "none",
              }}
              onClick={() => handleDeleteComment(commentId)}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{
                background: "#FF5722",
                textTransform: "none",
              }}
              fullWidth
            >
              Report
            </Button>
          </Grid>
        </Grid>
      </Select>
    </>
  );
};

export default DeleteComment;
