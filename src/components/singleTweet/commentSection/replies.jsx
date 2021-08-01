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
} from "@material-ui/core";
import "./replies.css";

import MakeReplyReply from "../../ActionsReply/makeReplyReply";
import MakeReplyLike from "../../ActionsReply/MakeReplyLike";
import MakeReplySend from "../../ActionsReply/makeReplySend";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import RepeatIcon from "@material-ui/icons/Repeat";
import { RepliesContext } from "../../../contexts/repliesContext";
import axios from "axios";

const useStyles = makeStyles({
  commentBox: {
    // border: "2px solid #fff",
    borderTop: "1px solid #2F3336",
    borderBottom: "1px solid #2F3336",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 40,
    marginBottom: 0,
    // borderRadius: 5,
  },
  replyCard: {
    margin: "auto",
    // borderTop: "1px solid #2F3336",
    // borderBottom: "1px solid #2F3336",
    // borderRadius: 15,
    marginTop: 0,
    // marginBottom: 10,
    marginBlock: 0,
    paddingTop: 8,
    paddingBottom: 8,
    background: "#000000",
    zIndex: 0,
  },
  replyTitle: {
    fontWeight: "bold",
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 20,
  },
  replySubheader: {
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#777",
    fontSize: 16,
  },
  replyBody: {
    textAlign: "left",
    marginTop: 10,
    marginLeft: 55,
    paddingTop: 0,
    color: "#D9D9D9",
    fontSize: 16,
  },
  icons: {
    fontSize: 18,
    color: "#6e767d",
  },
  menuItem: {
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 5,
  },
});

const ReplySection = ({ tweetId, comment }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

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

  // // Close the dropdown if the user clicks outside of it
  // window.onclick = function (e) {
  //   if (!e.target.matches(".dropbtn")) {
  //     var dropdowns = document.getElementsByClassName("dropdown-content");
  //     var i;
  //     for (i = 0; i < dropdowns.length; i++) {
  //       var openDropdown = dropdowns[i];
  //       if (openDropdown.classList.contains("show")) {
  //         openDropdown.classList.remove("show");
  //       }
  //     }
  //   }
  // };
  // function myFunction() {
  //   document.getElementById("myDropdown").classList.toggle("show");
  // }

  return (
    <>
      {replies.map((reply) =>
        reply._id && reply.commentId == comment._id ? (
          <Card key={reply._id} className={classes.replyCard}>
            <CardHeader
              style={{
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
              }}
              avatar={<Avatar className={classes.avatar}>G</Avatar>}
              action={
                <>
                  {/* <IconButton onClick={handleOpen}>
                    <MoreVertIcon />
                  </IconButton> */}
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
                          onClick={() => handleDeleteReply(reply._id)}
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
              }
              title={
                <Typography variant="h5" className={classes.replyTitle} component="h3">
                  {reply.name}
                </Typography>
              }
              subheader={<Typography className={classes.replySubheader}>{reply.date}</Typography>}
            />
            {/* <Grid item xs={2}>
                <div className="dropdown">
                  <Button onClick={myFunction} className="dropbtn">
                    Button
                  </Button>
                  <div id="myDropdown" className="dropdown-content">
                    <Button
                      fullWidth
                      style={{
                        background: "#F44336",
                        textTransform: "none",
                      }}
                      onClick={() => handleDeleteReply(reply.id)}
                    >
                      Delete
                    </Button>
                    <a href="#">Link 2</a>
                    <a href="#">Link 3</a>
                  </div>
                </div>
              </Grid> */}
            {/* removes the top & bottom padding from card content */}
            <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
              <Typography variant="body1" component="p" className={classes.replyBody}>
                {reply.body}
              </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.icons}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <MakeReplyReply tweetId={tweetId} reply={reply} />
                </Grid>

                <Grid item xs={4}>
                  <MakeReplyLike tweetId={tweetId} reply={reply} />
                </Grid>

                <Grid item xs={4}>
                  <MakeReplySend tweetId={reply.tweetId} reply={reply} />
                </Grid>
              </Grid>
            </CardActions>

            {/* {open ? (
              <>
                <Paper style={{ position: "relative", top: yPos, left: xPos, zIndex: 9 }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Button onClick={() => handleDeleteReply(reply.id)}>Delete</Button>
                    </Grid>
                    <Grid item xs={12}>
                      <Button>Report</Button>
                    </Grid>
                  </Grid>
                </Paper>
              </>
            ) : null} */}
          </Card>
        ) : null
      )}
    </>
  );
};

export default ReplySection;
