import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import MakeTweet from "./main/makeTweet";
import NewsFeed from "./main/newsFeed";

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
      <div style={{ margin: 0 }}>
        <MakeTweet />
        <NewsFeed tweets={tweets} />
      </div>
    </>
  );
};

export default Main;
