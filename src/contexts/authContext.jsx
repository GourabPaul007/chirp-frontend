import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import usernameExistsInBackend from "../contextHelpers/usernameExistsInBackend";
import createUserInBackend from "../contextHelpers/createUserInBackend";
import app, { auth } from "../firebase";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function signup(name, displayName, email, password) {
    //username is displayName
    console.log(email, password);
    // To ensure unique username
    if ((await usernameExistsInBackend(displayName)) === true) {
      console.log("inside check username");
      return "An Account with this username already exists.";
    }
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        await result.user.updateProfile({
          displayName: displayName,
        });
        const { user } = result;
        await createUserInBackend(user.uid, user.email, user.displayName, name);
      })
      .catch((e) => {
        console.log(e);
        return e.message;
      })
      .finally(() => {
        console.log("Done signing up");
        return;
      });
  }

  async function login(email, password) {
    console.log(email, password);
    try {
      await auth.signInWithEmailAndPassword(email, password);
      console.log(currentUser);
    } catch (e) {
      console.log(e);
    }
  }

  async function logout() {
    await auth.signOut();
    console.log(currentUser);
  }

  function resetPassword(email) {
    auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  // function UpdateProfileUsername(username) {
  //   return currentUser
  //     .updateProfile({
  //       displayName: username,
  //     })
  //     .then(() => {
  //       console.log("username: ", displayName);
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // }

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && props.children}</AuthContext.Provider>;
};
