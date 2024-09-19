import React, { useState, useEffect } from "react";
import styles from "./Playlist.module.css";
import Tracklist from "../Tracklist/Tracklist";

function Playlist({ playlist, setplaylist }) {
  const [playlistName, setPlaylistName] = useState("My Playlist");
  const [accessToken, setAccessToken] = useState("");
  const [expiresIn, setExpiresIn] = useState("");
  const [authState, setAuthState] = useState("");
  const [error, setError] = useState(null);

  function generateRandomString(length) {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  function parseSpotifyResponse() {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    const expires = params.get("expires_in");
    const state = params.get("state");
    const storedAuthState = localStorage.getItem("spotify_auth_state");

    if (token && state === storedAuthState) {
      setAccessToken(token);
      localStorage.setItem("spotify_access_token", token);
      setExpiresIn(expires);

      window.history.replaceState({}, document.title, window.location.pathname);

      if (!isNaN(expires)) {
        setTimeout(() => {
          setAccessToken("");
          localStorage.clear();
          setError("Session expired. Please log in again.");
        }, Number(expires) * 1000);
      }
    } else {
      alert("Access denied or CSRF attack detected!");
    }
  }

  useEffect(() => {
    const storedPlaylist = localStorage.getItem("playlist");
    if (storedPlaylist) {
      setplaylist(JSON.parse(storedPlaylist));
    }

    const storedToken = localStorage.getItem("spotify_access_token");
    if (storedToken) {
      setAccessToken(storedToken);
    } else if (window.location.hash) {
      parseSpotifyResponse();
    }
  }, [setplaylist]);

  function loginSpotify() {
    localStorage.setItem("playlist", JSON.stringify(playlist));
    const client_id = "3a6a48e95f5c4d37ac533f5471a4702e";
    const redirect_uri = "http://localhost:3000/";
    const state = generateRandomString(16);
    setAuthState(state);
    localStorage.setItem("spotify_auth_state", state);

    const scope =
      "user-read-private user-read-email playlist-modify-public playlist-modify-private";
    const authorizeurl = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(
      client_id
    )}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&state=${encodeURIComponent(state)}`;

    window.location.href = authorizeurl;
  }

  function namechangehandler(event) {
    setPlaylistName(event.target.value);
  }

  function saveToSpotify(e) {
    e.preventDefault();

    if (!playlistName.trim()) {
      alert("Please name your playlist.");
      return;
    }

    if (!accessToken) {
      loginSpotify();
      return;
    }

    if (playlist.length === 0) {
      alert("Your playlist is empty!");
      return;
    }

    saveplaylist(playlist);
  }

  function saveplaylist(playlist) {
    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        const userId = userData.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playlistName,
            description: "Playlist created with Jammming app",
            public: false,
          }),
        });
      })
      .then((response) => response.json())
      .then((playlistData) => {
        const playlistId = playlistData.id;
        addTracksToPlaylist(playlistId, playlist);
      })
      .catch((error) => console.log(error));
  }

  function addTracksToPlaylist(playlistId, tracks) {
    const trackUris = tracks.map((track) => `spotify:track:${track.id}`);

    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: trackUris,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tracks added successfully:", data);
      })
      .catch((error) => console.error("Error adding tracks:", error));
  }

  function removeTrack(trackId) {
    setplaylist((prev) => prev.filter((track) => track.id !== trackId));
  }

  return (
    <div className={styles.playlistContainer}>
      <h2>{playlistName}</h2>
      <input
        onChange={namechangehandler}
        type="text"
        placeholder="Type Your Playlist Name"
        value={playlistName}
      />
      <Tracklist tracks={playlist} removetrack={removeTrack} buttonsymbol="-" />
      {!accessToken ? (
        <button onClick={loginSpotify} className={styles.saveButton}>
          Login to Spotify
        </button>
      ) : (
        <button onClick={saveToSpotify} className={styles.saveButton}>
          Save to Spotify
        </button>
      )}
    </div>
  );
}

export default Playlist;
