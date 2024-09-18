import React,{useState} from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';

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
    console.log(playlist)
  }
  
  function removeTrack(event) {
  const button = event.currentTarget;  // The button that was clicked
  let allTrackContainers = button.parentElement.parentElement.querySelectorAll('[tracks="divTrackContainer"]');
  const parentDiv = button.closest('[tracks="divTrackContainer"]'); 
  const index = Array.prototype.indexOf.call(allTrackContainers, parentDiv)+1;
 setplaylist((prev)=>{
  const updatedList= prev.filter(item=>item.id!==index).map((item, newIndex) => ({
    ...item,
    id: newIndex + 1 // Reset the id based on the new index (starting from 1)
  }));
 return updatedList
 })
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
