import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({playlist}) {

  return (
    <div className={styles.playlistContainer}>
      <h2>Playlist</h2>
      <input type="text" placeholder='Type Your Playlist Name' />
      <Tracklist tracks={playlist} />
      <button className={styles.saveButton}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
