import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const [profile, setProfile] = useState({
    _id: null,
    name: null,
    username: null,
    uid: null,
    email: null,
    about: null,
  });

  return (
    <ProfileContext.Provider value={[profile, setProfile]}>
      {props.children}
    </ProfileContext.Provider>
  );
};
