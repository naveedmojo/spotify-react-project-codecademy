import React,{useState} from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults() {
  // Mock data for search results
  const [playlist,setPlaylist]=useState([])
  function addToPlaylist(event){
        const parent=event.target.parentNode
        const h3=parent.querySelector('h3')
        const p=parent.querySelector('p')
        const trackName=h3?h3.textContent:"NO DATA"
        const trackDetails=p?p.textContent:"NO DATA" 
        const [artist, album] = trackDetails.split(' | ')
        console.log("You have selected the ",trackName,artist, album)
        
  }
  const mockResults = [
    { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
    { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3' }
  ];

  return (
    <div >
      <h2>Results</h2>
      <Tracklist tracks={mockResults} addFunction={addToPlaylist}  />
    </div>
  );
}

export default SearchResults;