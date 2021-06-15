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
import { useStyles_ReplySection } from "../_singleTweetStyles";

const ReplySection = ({ replies, comment }) => {
  const classes = useStyles_ReplySection();
  return (
    <>
      {replies.map((reply) =>
        reply.id && reply.commentId == comment.id ? (
          <Card key={reply.id} className={classes.replyCard}>
            <CardHeader
              style={{ paddingTop: 0, paddingBottom: 0, marginTop: 0 }}
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
              title={
                <Typography variant="h5" className={classes.replyTitle} component="h3">
                  {reply.name}
                </Typography>
              }
              subheader={<Typography className={classes.replySubheader}>{comment.date}</Typography>}
            />
            {/* removes the top & bottom padding from card content */}
            <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
              <Typography variant="body1" component="p" className={classes.replyBody}>
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
        ) : null
      )}
    </>
  );
};

export default ReplySection;
