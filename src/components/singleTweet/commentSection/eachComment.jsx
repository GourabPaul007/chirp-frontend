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
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import RepeatIcon from "@material-ui/icons/Repeat";
// import ReplySection from "./commentSection/replies";

import { useStyles_CommentSection } from "../_singleTweetStyles";

const EachComment = ({ comment, replies }) => {
  const classes = useStyles_CommentSection();

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
            <Typography variant="h5" className={classes.commentTitle} component="h3">
              {comment.name}
            </Typography>
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
          <Grid container>
            <Grid item xs={3}>
              <IconButton style={{ marginLeft: "auto" }}>
                <CommentIcon className={classes.icons} />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton aria-label="share">
                <RepeatIcon className={classes.icons} />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon className={classes.icons} />
              </IconButton>
            </Grid>
            <Grid item xs={3}>
              <IconButton aria-label="share">
                <ShareIcon className={classes.icons} />
              </IconButton>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </>
  );
};

export default EachComment;
