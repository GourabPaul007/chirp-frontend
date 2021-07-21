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
  Link,
} from "@material-ui/core";

import MoreVertIcon from "@material-ui/icons/MoreVert";

import MakeComment from "../tweetActions/makeComment";
import MakeSave from "../tweetActions/makeSave";
import MakeLike from "../tweetActions/makeLike";
import MakeSend from "../tweetActions/makeSend";

import timeConverter from "../../utils/timeConverter";

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      maxWidth: 400,
      marginRight: 12,
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: 800,
    },
    // minWidth: 400,
    margin: 0,
    padding: 0,
    color: "#D9D9D9",
    backgroundColor: "#000",
  },
  title: {
    fontWeight: "bold",
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#D9D9D9",
  },
  username: {
    color: "#777",
    fontSize: 16,
    fontWeight: 300,
    marginRight: "auto",
    marginTop: 6,
    marginBottom: "auto",
    marginLeft: 6,
    alignSelf: "flex-start",
    textAlign: "left",
  },
  subHeader: {
    marginRight: "auto",
    alignSelf: "flex-start",
    textAlign: "left",
    color: "#777",
  },
  body: {
    fontSize: 14,
    align: "left",
    color: "#D9D9D9",
  },
  card: {
    margin: "auto",
    border: "1px solid #777",
    background: "#000",
    marginTop: 24,
    borderRadius: 15,
    color: "#D9D9D9",
  },
}));

const NewsFeed = ({ tweets }) => {
  const classes = useStyles();
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
                  <Grid container>
                    <Grid item>
                      <Link
                        target="_blank"
                        href="https://www.google.com"
                        style={{ color: "#D9D9D9" }}
                      >
                        <Typography variant="h5" className={classes.title} component="h3">
                          {tweet.name}
                        </Typography>
                      </Link>
                    </Grid>
                    <Grid item>
                      <Typography variant="h5" className={classes.username}>
                        @{tweet.username}
                      </Typography>
                    </Grid>
                  </Grid>
                }
                subheader={
                  <Typography
                    style={{
                      marginRight: "auto",
                      alignSelf: "flex-start",
                      textAlign: "left",
                      color: "#777",
                    }}
                  >
                    {timeConverter(tweet.date)}
                  </Typography>
                }
              />
              {/* Hovering on tweet & go to the tweet on click */}
              <CardActionArea
                href={"/tweet/" + tweet.id}
                // target="_blank"
                rel="noopener noreferrer"
              >
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
                    <MakeSend tweetId={tweet.id} />
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
