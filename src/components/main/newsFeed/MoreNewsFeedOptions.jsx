import React, { useContext } from "react";
import { Select, Grid, Button, makeStyles } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import { TweetContext } from "../../../contexts/tweetContext";
import { ProfileContext } from "../../../contexts/ProfileContext";

const useStyles = makeStyles({
  select: {
    "& ul": {
      backgroundColor: "#000000",
      border: "1px solid #fff",
      borderRadius: 5,
    },
    "& li": {
      fontSize: 20,
    },
  },
  deleteButton: {
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      // background: "#d50000",
    },
    // F44336
    padding: 8,
    minWidth: 120,
  },
  reportButton: {
    textTransform: "none",
    borderRadius: 0,
    "&:hover": {
      // background: "#FF5722",
    },
    padding: 8,
    minWidth: 120,
  },
});

const DeleteTweet = ({ tweetId, tweets, setTweets, authorID }) => {
  const classes = useStyles();

  // const [tweet, setTweet] = useContext(TweetContext);
  const [profile, setProfile] = useContext(ProfileContext);

  const indexOfObject = (newTweets, tweetId) => {
    for (let i = 0; i < newTweets.length; i++) {
      if (newTweets[i]._id == tweetId) {
        return i;
      }
    }
  };

  // Delete Tweet
  const handleDeleteTweet = async (tweetId) => {
    const url = `http://localhost:5000/api/tweets/${tweetId}/deleteTweet`;
    await axios.post(url);

    // need to remove the tweet that deleted from local state
    const newTweets = JSON.parse(JSON.stringify(tweets));
    console.log(newTweets);
    newTweets.splice(indexOfObject(newTweets, tweetId), 1);
    console.log(newTweets);
    setTweets(newTweets);
  };

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        IconComponent={MoreVertIcon}
        disableUnderline
        autoWidth
        style={{ marginRight: 12, marginTop: 6 }}
        MenuProps={{ classes: { paper: classes.select } }}
      >
        <Grid container spacing={0} direction={"column"}>
          {profile.uid === authorID ? (
            <Grid item xs={12}>
              <Button className={classes.deleteButton} onClick={() => handleDeleteTweet(tweetId)}>
                Delete
              </Button>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <Button className={classes.reportButton}>Report</Button>
          </Grid>
        </Grid>
      </Select>
    </>
  );
};

export default DeleteTweet;
