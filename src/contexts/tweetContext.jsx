import React, { createContext, useState } from "react";

export const TweetContext = createContext();

export const TweetProvider = (props) => {
  // Tweet contains properties of tweet such as name, body, likes etc
  const [tweet, setTweet] = useState({
    // ID is sent in props directly
    name: null,
    username: null,
    body: null,
    likes: [],
    saves: [],
    comments: [],
    likesNumber: null,
    commentsNumber: null,
  });

  return <TweetContext.Provider value={[tweet, setTweet]}>{props.children}</TweetContext.Provider>;
};
