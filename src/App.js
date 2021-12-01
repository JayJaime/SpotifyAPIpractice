import React, { Component, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Logout from "./components/logout";
import Info from "./components/info";

// base URL
const baseUrl = "https://accounts.spotify.com/authorize";
// Client ID from Spotify Dashboard
const clientId = "a0337d2abfe842d4bd61a18233fb5995";
// The scope of features you want to use
const scope = "user-top-read playlist-read-private";
// Where you want to be redirected after user is authenticated
const redirectUri = "http://localhost:3000/";
// Full URL
const authUrl = `${baseUrl}?response_type=token&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;

// The function used to pull out the access token, bearer, and expiration from the URL that is gotten after the user logs in
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

  useEffect(() => {
    if (window.location.hash) {
      const object = getReturnedParams(window.location.hash);
      console.log(object);
      setToken(object.access_token);
      setBearer(object.token_type);
      setExpiration(object.expires_in);
    }
  }, [token]);

  const handleClick = () => {
    window.location = `${authUrl}`;
  };

  const type = "artists";
  const topItemsUrl = `https://api.spotify.com/v1/me/top/${type}`;
  let topArtists = [];

  useEffect(() => {
    fetch(topItemsUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        topArtists = [];
        topArtists = data.items;
        console.log(topArtists);
      });
  }, [token, topArtists]);

  const renderCard = () => {
    console.log(topArtists);
    if (topArtists === undefined) {
      return;
    }
    topArtists.map((artist) => {
      console.log(artist);
      document.getElementById("card").innerHTML += `<h3>${artist.name}</h3>`;
    });
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
        <div>
          <button onClick={renderCard}></button>
          <div id="card"></div>
        </div>
      </header>
    </div>
  );
}

export default App;
