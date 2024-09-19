import React, { useState, useEffect } from "react";
import Tracklist from "../Tracklist/Tracklist";
import styles from "./SearchResults.module.css";

function SearchResults({ setplaylist }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const accessToken = localStorage.getItem("spotify_access_token");

  useEffect(() => {}, [accessToken]);

  const handleSearch = () => {
    if (!searchQuery) return;
    if (!accessToken) {
      alert("You need to log in to search for tracks.");
      return;
    }

    fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        searchQuery
      )}&type=track&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Search request failed");
        }
        return response.json();
      })
      .then((data) => {
        const results = data.tracks.items.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists.map((artist) => artist.name).join(", "),
          album: track.album.name,
          uri: track.uri,
        }));
        setSearchResults(results);
      })
      .catch((error) => console.error("Error fetching search results:", error));
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  const addToPlaylist = (event, track) => {
    setplaylist((prev) => {
      // Check if the track already exists in the playlist
      const trackExists = prev.some(
        (existingTrack) => existingTrack.uri === track.uri
      );

      if (trackExists) {
        alert("Selected Track already exists in Playlist");
        return prev;
      }

      // Add the new track if it doesn't already exist
      return [
        ...prev,
        {
          id: track.id,
          name: track.name,
          artist: track.artist,
          album: track.album,
          uri: track.uri, // Include the URI here
        },
      ];
    });
  };

  return (
    <div>
      <h2>Search for Tracks</h2>
      {accessToken ? (
        <div className={styles.SearchBar}>
          <input
            type="text"
            placeholder="Search for a song"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      ) : (
        <p>You need to log in to search for tracks.</p>
      )}
      <Tracklist
        tracks={searchResults}
        addFunction={addToPlaylist}
        buttonsymbol="+"
      />
    </div>
  );
}

export default SearchResults;
