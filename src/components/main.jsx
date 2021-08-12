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
    for (let i = 0; i < data.data.length; i++) {
      //element is a tweet object i.e. its the whole tweet
      let element = data.data[i];
      setTweets((tweets) => [
        ...tweets,
        {
          _id: element._id,
          name: element.name,
          username: element.username,
          body: element.body,
          date: element.date,
          likes: element.likes,
          saves: element.saves,
          comments: element.comments,
        },
      ]);
    }
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
          <NewsFeed tweets={tweets} />
        </div>
      </Grid>
    </>
  );
};

export default Main;
