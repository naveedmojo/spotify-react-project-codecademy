import React,{useState} from 'react';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults({setplaylist}) {
  function addToPlaylist(event) {
    const parent = event.target.parentNode;
    const h3 = parent.querySelector('h3');
    const p = parent.querySelector('p');
    const trackName = h3 ? h3.textContent : "NO DATA";
    const trackDetails = p ? p.textContent : "NO DATA"; 
    const [Artist, Album] = trackDetails.split(' | ');
    setplaylist((prev) => {
        // Check if the track already exists in the playlist
        const trackExists = prev.some(track => track.name === trackName && track.artist === Artist && track.album === Album);

        if (trackExists) {
           alert("Selected Track already exist in Playlist")
           return prev
        }

        // Add the new track if it doesn't already exist
        return [
            ...prev, 
            { 
                id: prev.length > 0 ? prev[prev.length - 1].id + 1 : 1, 
                name: trackName, 
                artist: Artist, 
                album: Album 
            }
        ];
    });
}

  const mockResults = [
    { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2' },
    { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3' },
    { id: 4, name: 'Song 4', artist: 'Artist 4', album: 'Album 4' }
  ];

  return (
    <div >
      <h2>Results</h2>
      <Tracklist tracks={mockResults} addFunction={addToPlaylist} buttonsymbol="+"  />
    </div>
  );
}

export default SearchResults;