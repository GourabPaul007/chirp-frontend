import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  Box,
  IconButton,
  Dialog,
  Avatar,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Collapse,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  DialogContent,
  Container,
  Grid,
  CardActionArea,
} from "@material-ui/core";
import axios from "axios";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/Comment";
import RepeatIcon from "@material-ui/icons/Repeat";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 600,
    },
    minWidth: 400,
    margin: "auto",
    padding: 0,
    color: "#fff",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    align: "left",
  },
  body: {
    fontSize: 14,
    align: "left",
    color: "#fff",
  },
  card: {
    margin: "auto",
    // background: "linear-gradient(45deg, #e91e63 50%, #ec407a 90%)",
    background: "#000000",
    marginTop: 24,
    borderRadius: 15,
    color: "#fff",
  },
  button: {
    // marginLeft: "auto",
    marginRight: 10,
    color: "#fff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 20,
    textTransform: "none",
    fontWeight: "bold",
    fontSize: 16,
  },
}));

const NewsFeed = ({ tweets }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  // Handlers for functions on a tweet
  // ===================================================================================================
  // ===================================================================================================
  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  // posting replies on a tweet
  const handleReply = (e) => {
    e.preventDefault();
    axios.post();
    setOpen(false);
  };
  // ===================================================================================================
  // ===================================================================================================

  return (
    <>
      <Container border={1} className={classes.root}>
        {tweets.map((tweet) =>
          tweet.id ? (
            <Card key={tweet.id} className={classes.card}>
              <CardHeader
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
                  <Typography
                    variant="h5"
                    style={{
                      fontWeight: "bold",
                      marginRight: "auto",
                      alignSelf: "flex-start",
                      textAlign: "left",
                      color: "#fff",
                    }}
                    component="h3"
                  >
                    {tweet.name}
                  </Typography>
                }
                subheader={
                  <Typography
                    style={{
                      marginRight: "auto",
                      alignSelf: "flex-start",
                      textAlign: "left",
                      color: "#fff",
                    }}
                  >
                    {tweet.date}
                  </Typography>
                }
              />
              {/* Hovering on tweet & go to the tweet on click */}
              <CardActionArea href={"/tweet/" + tweet.id} target="_blank" rel="noopener noreferrer">
                <CardContent>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    component="p"
                    style={{ textAlign: "left", color: "#fff" }}
                  >
                    {tweet.body}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions disableSpacing>
                <Grid container>
                  <Grid item xs={3}>
                    <IconButton onClick={handleClickOpen}>
                      <CommentIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton aria-label="retweet">
                      <RepeatIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={3}>
                    <IconButton aria-label="share" href={"/tweet/" + tweet.id}>
                      <ShareIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardActions>
              {/* ============================================================================= */}

              {/* Dialog messege to reply on a tweet */}
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    To subscribe to this website, please enter your email address here. We will send
                    updates occasionally.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    className={classes.button}
                    style={{ background: "#D32F2F" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleReply}
                    className={classes.button}
                    style={{ background: "#2196F3" }}
                  >
                    Reply
                  </Button>
                </DialogActions>
              </Dialog>
            </Card>
          ) : null
        )}
      </Container>
    </>
  );
};

export default NewsFeed;