import React,{useState,useEffect} from 'react';
import styles from './Playlist.module.css';
import Tracklist from '../Tracklist/Tracklist';


function Playlist({playlist,setplaylist}) {
  const [playlistName,setPlaylistName]=useState("My Playlist")
  const [accessToken, setAccessToken] = useState('');
  const [expiresIn, setExpiresIn] = useState('');
  const [error, setError] = useState(null);
  function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function parseSpotifyResponse() {
  const hash = window.location.hash.substring(1); // Remove the leading '#'
  const params = new URLSearchParams(hash);
  const token = params.get('access_token');
  const expires = params.get('expires_in');
  const error = params.get('error');
  // Get the state from the response
  
  if (token ) {
    setAccessToken(token);
    localStorage.setItem('spotify_access_token', token); // Store token in localStorage
    setExpiresIn(expires);
  
    // Clear the hash fragment from the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  
    // Set up token expiration
    if (!isNaN(expires)) {
      setTimeout(() => {
        setAccessToken(''); // Clear access token when it expires
        localStorage.removeItem('spotify_access_token'); // Clear token from storage
        setError('Session expired. Please log in again.');
      }, Number(expires) * 1000); // Convert seconds to milliseconds
    } else {
      console.error('Invalid expires_in value');
    }
  } else {
    alert("Access is denied");
  }
}


useEffect(() => {
  const storedPlaylist = localStorage.getItem('playlist');
  if (storedPlaylist) {
    console.log('Restoring playlist from localStorage:', JSON.parse(storedPlaylist));
    setplaylist(JSON.parse(storedPlaylist));
  }
  const storedToken = localStorage.getItem('spotify_access_token');
  if (storedToken) {
    setAccessToken(storedToken);
  } else if (window.location.hash) {
    parseSpotifyResponse();
  }
}, []);


  function loginSpotify(playList){
    console.log('Current playlist before redirect:', playlist);
    localStorage.setItem('playlist', JSON.stringify(playlist));
      const client_id = '3a6a48e95f5c4d37ac533f5471a4702e';
      let redirect_uri = 'http://localhost:3000/';
      const state = generateRandomString(16);
      
      localStorage.setItem('spotify_auth_state', state);
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
  function saveToSpotify(e) {
    e.preventDefault();
    
    if (!playlistName.trim()) {
      alert("Please name your playlist.");
      return;
    }
    
   
    
    if (!accessToken) {
      // If not logged in, trigger Spotify login
      loginSpotify();
      return;
    }
    
    // Code to save the playlist to Spotify using the accessToken
   
    saveplaylist(playlist)
    
  }
  function saveplaylist(playlist){
    console.log('saving to spotify playlist......',playlist)
    localStorage.setItem('playlist', JSON.stringify(playlist));
    if(playlist.length===0){
      console.log("your playlist is empty")
      return
    }
    fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        if(!response.ok){
          throw new Error("network response not ok")
        }
        return response.json()
      })
      .then(userData=>{
        const userId=userData.id
        console.log(userId)
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: playlistName,
            description: 'Playlist created with Jammming app',
            public: false,
          }),
        });
      })
      .then(response =>{
        if (!response.ok) {
          return response.json().then(err=>{throw new Error('Failed to create playlist..',err);})
      }
      return response.json();
    })
    .then(playlistData=>{
      const playlistId = playlistData.id;
      console.log(playlistId)
      addTracksToPlaylist(playlistId, playlist);
     
    })
    .catch(error=>console.log(error))
  
  }
  function addTracksToPlaylist(playlistId, tracks) {
    const trackUris = tracks.map(track => `spotify:track:${track.id}`); // Generate Spotify URIs from track ids
    console.log(trackUris)
  if (trackUris.length === 0) {
    console.error("No tracks to add.");
    return;
  }
  
  fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: trackUris,  // Spotify API requires track URIs to be in an array
    }),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(error => {
        throw new Error(`Failed to add tracks to the playlist. Status code: ${response.status}, ${error.error.message}`);
      });
    }
    return response.json();
  })
  .then(data => {
    console.log('Tracks added successfully:', data);
  })
  .catch(error => console.error('Error adding tracks:', error));
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
