import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist() {
  // Mock data for playlist
  const mockPlaylist = [
    { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3' }
  ];

  return (
    <div >
      <h2>Playlist</h2>
      <input type="text" defaultValue="New Playlist" />
      <Tracklist tracks={mockPlaylist} />
      <button className={styles.saveButton}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;