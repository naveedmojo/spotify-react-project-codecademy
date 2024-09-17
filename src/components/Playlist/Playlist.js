import React from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

function Playlist({playlist,setplaylist}) {
  function removeTrack(event) {
     const buttonKey = parseInt(event.currentTarget.getAttribute('data-key'));
     console.log(playlist,buttonKey)
     setplaylist(prev => prev.filter(track => track.id !== buttonKey));

}

  return (
    <div className={styles.playlistContainer}>
      <h2>Playlist</h2>
      <input type="text" placeholder='Type Your Playlist Name' />
      <Tracklist tracks={playlist} removetrack={removeTrack}  buttonsymbol="-" />
      <button className={styles.saveButton}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
