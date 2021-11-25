import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Page from "./components/page";
import Logout from "./components/logout";
import Info from "./components/info";

const baseUrl = "https://accounts.spotify.com/authorize";
const clientId = "a0337d2abfe842d4bd61a18233fb5995";
const scope = "user-top-read";
const redirectUri = "http://localhost:3000/";
const authUrl = `${baseUrl}?response_type=token&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
// http://localhost:3000/page.html#access_token=BQBHpcoEP38SeEjkPaw4T_dXHa_QC9BRjHreaFzitZ6VMfMlqMK-JTKQg0wno2vBYsPPaKAKKiU3CemVOnQRsLJSWw36ZUp72AS0Jpe0W5kwcKFVifK0wAgHZCgmQwSG61r2EmEEETu1MY5VsCgrTg&token_type=Bearer&expires_in=3600
const getReturnedParams = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramsSplitUp = paramsInUrl.reduce((accumulator, currentValue) => {
    // console.log(currentValue);
    const [key, value] = currentValue.split("=");
    accumulator[key] = value;
    return accumulator;
  }, {});
  return paramsSplitUp;
};

function App() {
  const [token, setToken] = useState("token");
  const [bearer, setBearer] = useState("bearer");
  const [expiration, setExpiration] = useState("expires in");
  // https://accounts.spotify.com/authorize?response_type=token&client_id=&scope=&redirect_uri=
  // console.log(authUrl);
  useEffect(() => {
    if (window.location.hash) {
      const object = getReturnedParams(window.location.hash);
      // setToken(object.access_token);
      setToken(object.access_token);
      setBearer(object.token_type);
      setExpiration(object.expires_in);
      console.log(token + " " + bearer + " " + expiration);
    }
  }, [token]);
  const handleClick = () => {
    window.location = `${authUrl}`;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button
          onClick={handleClick}
          className="App-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Sign Up with Spotify
        </button>
        <Logout />
        <Info token={token} expiration={expiration} bearer={bearer} />
      </header>
    </div>
  );
}

export default App;
