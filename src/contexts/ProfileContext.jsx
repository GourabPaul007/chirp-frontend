import React, { createContext, useState } from "react";

export const ProfileContext = createContext();

export const ProfileProvider = (props) => {
  const [profile, setProfile] = useState({
    uid: null,
    name: null,
    displayName: null,
    email: null,
    about: null,
  });

  return (
    <ProfileContext.Provider value={[profile, setProfile]}>
      {props.children}
    </ProfileContext.Provider>
  );
};
