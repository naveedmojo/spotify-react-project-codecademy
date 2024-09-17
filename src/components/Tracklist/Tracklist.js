import React from 'react';
import Track from '../Track/Track';

function Tracklist({tracks,addFunction,buttonsymbol,removetrack}) {
  return (
    <div >
      {tracks.map((track,index) => (
        <Track  buttonKey={index + 1} key={track.id} track={track} removeTrack={removetrack} addToPlaylist={addFunction} buttonvalue={buttonsymbol} />
      ))}
    </div>
  );
}

export default Tracklist;