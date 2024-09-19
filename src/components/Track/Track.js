import React from "react";
import styles from "./Track.module.css";
import { MdDelete } from "react-icons/md";
function Track({ track, addToPlaylist, buttonvalue, removeTrack }) {
  return (
    <div className={styles.trackContainer} tracks="divTrackContainer">
      <div>
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      <button
        onClick={(event) =>
          buttonvalue === "+"
            ? addToPlaylist(event, track)
            : removeTrack(track.id)
        }
        className={styles.actionButton}
      >
        {buttonvalue === "-" ? <MdDelete /> : "+"}
      </button>
    </div>
  );
}

export default Track;
