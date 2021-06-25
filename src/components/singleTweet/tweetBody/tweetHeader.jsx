import React, { useContext } from "react";
import { Grid, Link } from "@material-ui/core";

import { useStyles_TweetBody } from "../_singleTweetStyles";

import { Typography, IconButton, Avatar, CardHeader } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { TweetContext } from "../../../contexts/tweetContext";

const TweetHeader = () => {
  const classes = useStyles_TweetBody();

  const [tweet, setTweet] = useContext(TweetContext);

  return (
    <>
      <CardHeader
        style={{ paddingBottom: 0, paddingTop: 0 }}
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
              <Link target="_blank" href="https://www.google.com" style={{ color: "#D9D9D9" }}>
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
        subheader={<Typography className={classes.subHeader}>{tweet.date}</Typography>}
      />
    </>
  );
};

export default TweetHeader;
