import React from "react";
import {
  makeStyles,
  Typography,
  Box,
  IconButton,
  Avatar,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  TextField,
  DialogActions,
  Button,
  Container,
  Grid,
  Link,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import RepeatIcon from "@material-ui/icons/Repeat";
// import ReplySection from "./commentSection/replies";

import MakeCommentLike from "../../commentActions/makeCommentLike";
import MakeSend from "../../tweetActions/makeSend";

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
    marginTop: 0,
    marginLeft: 56,
    paddingTop: 0,
    color: "#D9D9D9",
    fontSize: 16,
  },
  icons: {
    fontSize: 18,
    color: "#6e767d",
    paddingTop: 0,
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
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              G
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          // Comment Title
          title={
            <Grid container>
              <Grid item>
                <Link target="_blank" href="https://www.google.com" style={{ color: "#D9D9D9" }}>
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
            // <Typography variant="h5" className={classes.commentTitle} component="h3">
            //   {comment.name}
            // </Typography>
          }
          subheader={<Typography className={classes.commentSubheader}>{comment.date}</Typography>}
        />
        {/* removes the top & bottom padding from card content */}
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Typography variant="body1" component="p" className={classes.commentBody}>
            {comment.body} - Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste ab
            commodi iusto quasi error voluptatibus, perferendis vitae minima, sapiente nostrum
            asperiores consequuntur.
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.icons}>
          <Grid container spacing={1}>
            {/* <Grid item xs={3}>
              <IconButton style={{ marginLeft: "auto" }}>
                <CommentIcon className={classes.icons} />
              </IconButton>
            </Grid> */}
            <Grid item>
              <MakeCommentLike tweetId={tweetId} comment={comment} />
            </Grid>
            {/* <Grid item xs={3}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon className={classes.icons} />
              </IconButton>
            </Grid> */}
            <Grid item xs={3}>
              <MakeSend tweetId={comment.tweetId} />
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default EachComment;
