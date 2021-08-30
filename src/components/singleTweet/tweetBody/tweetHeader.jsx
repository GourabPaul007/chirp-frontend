import React, { useContext } from "react";
import { Grid, Link, makeStyles } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

import { Typography, IconButton, Avatar, CardHeader } from "@material-ui/core";
import { TweetContext } from "../../../contexts/tweetContext";

import timeConverter from "../../../utils/timeConverter";
import DeleteTweet from "../../ActionsTweet/moreTweetOptions";

import getRandomColor from "../../../utils/getRandomThemeColor";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: `${getRandomColor()}`,
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
}));

const TweetHeader = ({ tweetId }) => {
  const classes = useStyles();

  const [tweet, setTweet] = useContext(TweetContext);

  return (
    <>
      <CardHeader
        style={{ paddingBottom: 0, paddingTop: 0 }}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {tweet.name[0]}
          </Avatar>
        }
        action={<DeleteTweet tweetId={tweetId} />}
        title={
          <Grid container>
            <Grid item>
              <Link
                target="_blank"
                href={`/user-profiles/${tweet.username}`}
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
          <Typography className={classes.subHeader}>{timeConverter(tweet.date)}</Typography>
        }
      />
    </>
  );
};

export default TweetHeader;
