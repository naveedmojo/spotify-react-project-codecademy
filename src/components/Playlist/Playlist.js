import React,{useState} from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';


function Playlist({playlist,setplaylist}) {
  const [playlistName,setPlaylistName]=useState("My Playlist")
  function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
  function loginSpotify(playList){
      console.log(playList)
      const client_id = '3a6a48e95f5c4d37ac533f5471a4702e';
      let redirect_uri = 'http://localhost:3001';
      const stateKey = 'spotify_auth_state';
      const state = generateRandomString(16);

      localStorage.setItem(stateKey, state);
      let scope = 'user-read-private user-read-email playlist-modify-public playlist-modify-private';

      let authorizeurl = 'https://accounts.spotify.com/authorize';
      authorizeurl += '?response_type=token';
      authorizeurl += '&client_id=' + encodeURIComponent(client_id);
      authorizeurl += '&scope=' + encodeURIComponent(scope);
      authorizeurl += '&redirect_uri=' + encodeURIComponent(redirect_uri);
      authorizeurl += '&state=' + encodeURIComponent(state);
      window.location.href = authorizeurl;
    }
  function namechangehandler(event){
    setPlaylistName(event.target.value)
  }
  function saveToSpotify(e){
    e.preventDefault()
    if(!playlistName || !playlist){
      alert("name your playlist or playlist empty")
      return
    }
    loginSpotify(playlist)
    
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
