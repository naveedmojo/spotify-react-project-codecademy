import React from 'react';
import styles from './Tracklist.module.css';
import Track from '../Track/Track';

function Tracklist({tracks,addFunction}) {
  return (
    <div >
      {tracks.map(track => (
        <Track key={track.id} track={track} addToPlaylist={addFunction} />
      ))}
    </div>
  );
}

export default Tracklist;