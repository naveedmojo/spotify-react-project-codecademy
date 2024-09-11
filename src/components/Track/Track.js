import React from 'react';
import styles from './Track.module.css';

function Track({ track }) {
  return (
    <div>
      <h3>{track.name}</h3>
      <p>{track.artist} | {track.album}</p>
      <button className={styles.actionButton}>+</button>
    </div>
  );
}

export default Track;