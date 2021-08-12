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

import MakeReplyReply from "../../ActionsReply/makeReplyReply";
import MakeReplyLike from "../../ActionsReply/MakeReplyLike";
import MakeReplySend from "../../ActionsReply/makeReplySend";

import { RepliesContext } from "../../../contexts/repliesContext";
import timeConverter from "../../../utils/timeConverter";
import MoreOptions from "../../ActionsReply/moreReplyOptions";

const useStyles = makeStyles({
  commentBox: {
    borderTop: "1px solid #2F3336",
    borderBottom: "1px solid #2F3336",
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 40,
    marginBottom: 0,
  },
  replyCard: {
    margin: "auto",
    marginTop: 0,
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
  username: {
    color: "#777",
    fontSize: 16,
    fontWeight: 300,
    marginRight: "auto",
    marginTop: 3,
    marginBottom: "auto",
    marginLeft: 6,
    alignSelf: "flex-start",
    textAlign: "left",
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
});

const ReplySection = ({ tweetId, comment }) => {
  const classes = useStyles();

  const [replies, setReplies] = useContext(RepliesContext);

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
                marginBottom: 0,
              }}
              avatar={<Avatar className={classes.avatar}>G</Avatar>}
              // More Options
              action={<MoreOptions reply={reply} />}
              title={
                <Grid container>
                  <Grid item>
                    <Link
                      target="_blank"
                      href="https://www.google.com"
                      style={{ color: "#D9D9D9" }}
                    >
                      <Typography variant="h5" className={classes.replyTitle} component="h3">
                        {reply.name}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" className={classes.username} component="h3">
                      @{reply.username}
                    </Typography>
                  </Grid>
                </Grid>
              }
              subheader={
                <Typography className={classes.replySubheader}>
                  {timeConverter(reply.date)}
                </Typography>
              }
            />
            {/* removes the top & bottom padding from card content */}
            <CardContent style={{ paddingTop: 0, paddingBottom: 0, marginTop: 0, marginBottom: 0 }}>
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
          </Card>
        ) : null
      )}
    </>
  );
};

export default ReplySection;
