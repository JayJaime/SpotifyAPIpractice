import React, { Component, useEffect, useState } from "react";

export default function Info(props) {
  // https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123
  const baseUrl = "https://example.com/callback#access_token=";
  const token_txt_type = "&token_type=";
  const expires_txt_in = "&expires_in=";
  const newUrl = `${baseUrl}${props.token}${token_txt_type}${props.bearer}${expires_txt_in}${props.expiration}`;
  const topItemsUrl = "https://api.spotify.com/v1/me/top/type";

  console.log(newUrl);
  useEffect(() => {
    fetch(topItemsUrl)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, [props.token]);

  return (
    <div>
      <button>Show Info</button>
      <p>{props.token}</p>
    </div>
  );
}
