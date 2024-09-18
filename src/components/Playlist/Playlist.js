import React,{useState} from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';
import LoginSpotify from "../LoginSpotify";

function Playlist({playlist,setplaylist}) {
  const [playlistName,setPlaylistName]=useState("My Playlist")
  function namechangehandler(event){
    setPlaylistName(event.target.value)
  }
  function saveToSpotify(e){
    e.preventDefault()
    if(!playlistName){
      alert("name your playlist")
      return
    }
    <LoginSpotify/>
    console.log(playlist)
  }
  
  
    function removeTrack(trackId) {
      setplaylist((prev) => prev.filter((track) => track.id !== trackId));
    }
  

  return (
    <div className={styles.playlistContainer}>
      <h2>{playlistName}</h2>
      <input  onChange={(event)=>namechangehandler(event)} type="text" placeholder='Type Your Playlist Name' value={playlistName} />
      <Tracklist tracks={playlist} removetrack={removeTrack}  buttonsymbol="-" />
      <button onClick={(e)=>{saveToSpotify(e)}} className={styles.saveButton}>Save to Spotify</button>
    </div>
  );
}

export default Playlist;
