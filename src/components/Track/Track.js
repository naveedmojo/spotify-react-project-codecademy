import React from 'react';
import styles from './Track.module.css';

function Track({ track,addToPlaylist}) {
  
  return (
    <div className={styles.trackContainer} >
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button onClick={event=>addToPlaylist(event)} className={styles.actionButton}>+</button>
    </div>
  );
}

export default Track;
