import React from 'react';
import styles from './Track.module.css';
import { MdDelete } from "react-icons/md";
function Track({ track,addToPlaylist,buttonvalue,removeTrack,buttonKey}) {
  
  return (
    <div className={styles.trackContainer} >
      <div>
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button data-key={buttonKey} onClick={event=>buttonvalue==="+"?addToPlaylist(event):removeTrack(event)} className={styles.actionButton}>{buttonvalue==="-"?<MdDelete />:"+"}</button>
    </div>
  );
}

export default Track;
