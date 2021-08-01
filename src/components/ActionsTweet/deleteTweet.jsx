import React, { useContext } from "react";
import { Select, Grid, Button } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from "axios";
import { TweetContext } from "../../contexts/tweetContext";

const DeleteTweet = ({ tweetId }) => {
  const [tweet, setTweet] = useContext(TweetContext);

  // Delete Tweet
  const handleDeleteTweet = async (tweetId) => {
    const url = `http://localhost:5000/api/tweets/${tweetId}/deleteTweet`;
    await axios.post(url);
    setTweet({
      _id: null,
      name: null,
      username: null,
      body: null,
      likes: [],
      saves: [],
      likesNumber: null,
      commentsNumber: null,
    });
  };

  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        IconComponent={MoreVertIcon}
        disableUnderline
        autoWidth
        style={{ marginRight: 12, marginTop: 6, background: "#000" }}
      >
        <Grid container spacing={1} style={{ background: "#000" }}>
          <Grid item xs={12}>
            <Button
              fullWidth
              style={{
                background: "#F44336",
                textTransform: "none",
              }}
              onClick={() => handleDeleteTweet(tweetId)}
            >
              Delete
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              style={{
                background: "#FF5722",
                textTransform: "none",
              }}
              fullWidth
            >
              Report
            </Button>
          </Grid>
        </Grid>
      </Select>
    </>
  );
};

export default DeleteTweet;
