import React from "react";
import Track from "../Track/Track";

function Tracklist({ tracks, addFunction, buttonsymbol, removetrack }) {
  return (
    <div>
      {tracks.map((track, index) => (
        <Track
          key={track.id}
          track={track}
          removeTrack={removetrack}
          addToPlaylist={addFunction}
          buttonvalue={buttonsymbol}
        />
      ))}
    </div>
  );
}

export default Tracklist;
