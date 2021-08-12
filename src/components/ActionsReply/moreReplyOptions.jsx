import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Typography,
  Avatar,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Grid,
  makeStyles,
  Button,
  Select,
  Link,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import axios from "axios";
import { RepliesContext } from "../../contexts/repliesContext";

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
      background: "#d50000",
    },
    padding: 8,
  },
  reportButton: {
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      background: "#FF5722",
    },
    padding: 8,
  },
});

const MoreOptions = ({ reply }) => {
  const classes = useStyles();

  const [replies, setReplies] = useContext(RepliesContext);

  const indexOfObject = (newReplies, replyId) => {
    for (let i = 0; i < newReplies.length; i++) {
      if (newReplies[i]._id == replyId) {
        return i;
      }
    }
  };

  // Delete reply
  const handleDeleteReply = async (replyId) => {
    console.log(replyId);
    const url = `http://localhost:5000/api/replies/${replyId}/deleteReply`;
    await axios.post(url);
    // handleClose();

    // need to remove the reply that deleted from local state
    const newReplies = JSON.parse(JSON.stringify(replies));
    console.log(newReplies);
    newReplies.splice(indexOfObject(newReplies, replyId), 1);
    console.log(newReplies);
    setReplies(newReplies);
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
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Button
              fullWidth
              className={classes.deleteButton}
              onClick={() => handleDeleteReply(reply._id)}
            >
              Delete
            </Button>
          </Grid>
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

export default MoreOptions;
