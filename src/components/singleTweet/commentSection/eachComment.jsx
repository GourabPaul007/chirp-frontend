import React from "react";
import {
  makeStyles,
  Typography,
  Avatar,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Grid,
  Link,
} from "@material-ui/core";

// import ReplySection from "./commentSection/replies";

import MakeCommentLike from "../../ActionsComment/makeCommentLike";
import MakeCommentReply from "../../ActionsComment/makeCommentReply";
import MakeCommentSend from "../../ActionsComment/makeCommentSend";
import MoreCommentOptions from "../../ActionsComment/moreCommentOptions";

import timeConverter from "../../../utils/timeConverter";
import getRandomColor from "../../../utils/getRandomThemeColor";

const useStyles = makeStyles({
  onlyComment: {
    /*each (comment with replies section) has its own border radius & stuff.
    And it overlaps comment section border radius*/
    borderRadius: 15,
    backgroundColor: "#000",
  },
  commentTitle: {
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
  commentSubheader: {
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#777",
    fontSize: 16,
  },
  commentBody: {
    textAlign: "left",
    marginTop: 10,
    marginLeft: 56,
    paddingTop: 0,
    color: "#D9D9D9",
    fontSize: 16,
  },
  icons: {
    fontSize: 18,
    color: "#6e767d",
    paddingTop: 8,
    paddingBottom: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  avatar: {
    backgroundColor: `${getRandomColor()}`,
  },
});

const EachComment = ({ comment, replies, tweetId }) => {
  const classes = useStyles();

  return (
    <>
      {/* this card is the main comment */}
      <Card className={classes.onlyComment}>
        <CardHeader
          style={{
            paddingBottom: 0,
          }}
          avatar={<Avatar className={classes.avatar}>{comment.name[0]}</Avatar>}
          action={<MoreCommentOptions commentId={comment._id} authorID={comment.authorID} />}
          // Comment Title
          title={
            <Grid container>
              <Grid item>
                <Link
                  target="_blank"
                  href={`/user-profiles/${comment.username}`}
                  style={{ color: "#D9D9D9" }}
                >
                  <Typography variant="h5" className={classes.commentTitle} component="h3">
                    {comment.name}
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Typography variant="h5" className={classes.username}>
                  @{comment.username}
                </Typography>
              </Grid>
            </Grid>
          }
          subheader={
            <Typography className={classes.commentSubheader}>
              {timeConverter(comment.date)}
            </Typography>
          }
        />
        {/* removes the top & bottom padding from card content */}
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Typography variant="body1" component="p" className={classes.commentBody}>
            {comment.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.icons}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              <MakeCommentReply tweetId={tweetId} comment={comment} />
            </Grid>

            <Grid item xs={4}>
              <MakeCommentLike tweetId={tweetId} comment={comment} />
            </Grid>

            <Grid item xs={4}>
              <MakeCommentSend tweetId={comment.tweetId} comment={comment} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default EachComment;
