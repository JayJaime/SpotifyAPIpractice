import React, { Component, useEffect, useState } from "react";
import Card from "./card";

export default function Info(props) {
  //   const type = "artists";
  //   const topItemsUrl = `https://api.spotify.com/v1/me/top/${type}`;
  //   let topArtists = [];

  //   useEffect(() => {
  //     fetch(topItemsUrl, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + props.token,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         topArtists = data.items;
  //         console.log(topArtists);
  //       });
  //   }, [props.token]);

  return (
    <div>
      <button>Show Info</button>
    </div>
  );
}
