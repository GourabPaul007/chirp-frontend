import React, { createContext, useState } from "react";

export const CommentsContext = createContext();

export const CommentsProvider = (props) => {
  // Comments is an array of objects
  const [comments, setComments] = useState([
    {
      _id: null,
      tweetId: null,
      name: null,
      username: null,
      authorID: null,
      date: null,
      body: null,
      likes: null,
    },
  ]);

  return (
    <CommentsContext.Provider value={[comments, setComments]}>
      {props.children}
    </CommentsContext.Provider>
  );
};
