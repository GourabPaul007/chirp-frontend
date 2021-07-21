import React, { createContext, useState } from "react";

export const CommentContext = createContext();

export const CommentProvider = (props) => {
  const [comment, setComment] = useState({
    id: null,
    tweetId: null,
    name: null,
    username: null,
    date: null,
    body: null,
    likes: null,
  });

  return (
    <CommentContext.Provider value={[comment, setComment]}>
      {props.children}
    </CommentContext.Provider>
  );
};
