import React, { Component, useEffect, useState } from "react";

const logoutUrl = "https://www.spotify.com/logout/";

export default function logout() {
  const handleLogout = () => {
    const logoutWindow = window.open(
      logoutUrl,
      "Spotify Logout",
      "width=700, height=500, top=40, left=40"
    );

    setTimeout(() => logoutWindow.close(), 2000);
  };

  return (
    <div>
      <button id="outBtn" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}
