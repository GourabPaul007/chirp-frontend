import React, { useContext } from "react";
import { Select, Grid, Button, makeStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import { TweetContext } from "../../contexts/tweetContext";
import { CommentsContext } from "../../contexts/commentsContext";
import { ProfileContext } from "../../contexts/ProfileContext";

const useStyles = makeStyles({
  select: {
    "& ul": {
      backgroundColor: "#000000",
      border: "1px solid #fff",
      borderRadius: 5,
    },
    "& li": {
      fontSize: 20,
    },
  },
  deleteButton: {
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      // background: "#d50000",
    },
    padding: 8,
    minWidth: 120,
  },
  reportButton: {
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      // background: "#FF5722",
    },
    padding: 8,
    minWidth: 120,
  },
});

const MoreCommentOptions = ({ commentId, authorID }) => {
  const classes = useStyles();

  const [comments, setComments] = useContext(CommentsContext);
  const [profile, setProfile] = useContext(ProfileContext);

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
    newComments.splice(indexOfObject(newComments, commentId), 1);
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
        style={{ marginRight: 12, marginTop: 6 }}
        MenuProps={{ classes: { paper: classes.select } }}
      >
        <Grid container spacing={0} direction="column">
          {profile.uid === authorID ? (
            <Grid item xs={12}>
              <Button
                fullWidth
                className={classes.deleteButton}
                onClick={() => handleDeleteComment(commentId)}
              >
                Delete
              </Button>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Button className={classes.reportButton} fullWidth>
              Report
            </Button>
          </Grid>
        </Grid>
      </Select>
    </>
  );
};

export default MoreCommentOptions;
