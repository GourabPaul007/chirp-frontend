import React, { useState } from "react";
import {
  makeStyles,
  Typography,
  IconButton,
  Avatar,
  CardHeader,
  Card,
  CardContent,
  CardActions,
  Container,
  Grid,
  CardActionArea,
} from "@material-ui/core";
import axios from "axios";

import MoreVertIcon from "@material-ui/icons/MoreVert";
import MakeSend from "./newsFeed/makeSend";

import MakeLike from "./newsFeed/makeLike";
import MakeComment from "./newsFeed/makeComment";
import MakeSave from "./newsFeed/makeSave";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 800,
    },
    minWidth: 400,
    margin: 0,
    padding: 0,
    color: "#fff",
  },
  title: {
    fontWeight: "bold",
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#fff",
  },
  body: {
    fontSize: 14,
    align: "left",
    color: "#fff",
  },
  card: {
    margin: "auto",
    border: "1px solid #777",
    background: "#000",
    marginTop: 24,
    borderRadius: 15,
    color: "#fff",
  },
  // button: {
  //   // marginLeft: "auto",
  //   marginRight: 10,
  //   color: "#fff",
  //   paddingTop: 8,
  //   paddingBottom: 8,
  //   paddingLeft: 16,
  //   paddingRight: 16,
  //   borderRadius: 20,
  //   textTransform: "none",
  //   fontWeight: "bold",
  //   fontSize: 16,
  // },
}));

const NewsFeed = ({ tweets }) => {
  const classes = useStyles();

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
                  <Typography variant="h5" className={classes.title} component="h3">
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
                    <MakeComment tweetId={tweet.id} />
                  </Grid>
                  <Grid item xs={3}>
                    <MakeSave tweetId={tweet.id} />
                  </Grid>
                  <Grid item xs={3}>
                    <MakeLike tweetId={tweet.id} />
                  </Grid>
                  <Grid item xs={3}>
                    <MakeSend />
                  </Grid>
                </Grid>
              </CardActions>
            </Card>
          ) : null
        )}
      </Container>
    </>
  );
};

export default NewsFeed;
