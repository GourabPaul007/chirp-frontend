import React, { Component, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import MakeTweet from "./main/makeTweet";
import NewsFeed from "./main/newsFeed";
import Banner from "./banner";

const Main = (props) => {
  const [tweets, setTweets] = useState([
    {
      _id: null,
      name: null,
      username: null,
      authorID: null,
      body: null,
      date: null,
      likes: [],
      saves: [],
      comments: [],
    },
  ]);

  useEffect(async () => {
    const URL = "http://localhost:5000/api/tweets";
    const data = await axios.get(URL);
    data.data.forEach((t) => {
      setTweets((tweets) => [
        ...tweets,
        {
          _id: t._id,
          name: t.name,
          username: t.username,
          authorID: t.authorID,
          body: t.body,
          date: t.date,
          likes: t.likes,
          saves: t.saves,
          comments: t.comments,
        },
      ]);
    });
  }, []);

  return (
    <>
      <Grid item xs={2} sm={4} lg={4}>
        <Banner />
      </Grid>
      {/* Middle Grid - news feed & make tweet */}
      <Grid item xs={8} sm={6} lg={5}>
        {/* <Main /> */}
        <div style={{ margin: 0 }}>
          <MakeTweet />
          <NewsFeed tweets={tweets} setTweets={setTweets} />
        </div>
      </Grid>
    </>
  );
};

export default Main;
