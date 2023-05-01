import React, { useState, createContext, useEffect } from "react";
import userCartService from "../services/useritems";
import reviewService from "../services/reviews";
import loginService from "../services/login";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  // stores user info (token, name) when user is logged in
  const [user, setUser] = useState(null);

  // retreive user info from local storage, if it exists
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      userCartService.setToken(user.token);
      reviewService.setToken(user.token);
    }
  }, []);

  const loginToApp = async (username, password) => {
    const user = await loginService.login({
      username,
      password,
    });

    window.localStorage.setItem("loggedUser", JSON.stringify(user));
    userCartService.setToken(user.token);
    reviewService.setToken(user.token);
    setUser(user);

    // log user out after 1 hour
    setTimeout(() => {
      window.localStorage.removeItem("loggedUser");
      setUser(null);
    }, 1000 * 60 * 60);
    return user;
  };

  return (
    <UserContext.Provider value={{ user, setUser, loginToApp }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
