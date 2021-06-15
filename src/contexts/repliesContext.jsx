import React, { createContext, useState } from "react";

export const RepliesContext = createContext();

export const RepliesProvider = (props) => {
  // Replies os an array of objects with a comment id
  const [replies, setReplies] = useState([
    {
      id: null,
      commentId: null,
      name: null,
      date: null,
      body: null,
      likes: null,
    },
  ]);

  return (
    <RepliesContext.Provider value={[replies, setReplies]}>
      {props.children}
    </RepliesContext.Provider>
  );
};
