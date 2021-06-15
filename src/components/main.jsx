import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import MakeTweet from "./main/makeTweet";
import NewsFeed from "./main/newsFeed";

const Main = (props) => {
  const [tweets, setTweets] = useState([
    {
      id: "",
      name: "",
      body: "",
    },
  ]);

  useEffect(async () => {
    const URL = "http://localhost:5000/api/tweets";
    const data = await axios.get(URL);
    console.log(data);
    for (let i = 0; i < data.data.length; i++) {
      //element is a tweet object i.e. its the whole tweet
      let element = data.data[i];
      setTweets((tweets) => [
        ...tweets,
        { id: element.id, name: element.name, body: element.body, date: element.date },
      ]);
    }
  }, []);

  return (
    <>
      {/* Component to create new tweet */}
      <MakeTweet />

      <NewsFeed tweets={tweets} />
    </>
  );
};

export default Main;
