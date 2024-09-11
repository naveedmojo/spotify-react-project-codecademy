import React from 'react';
import styles from './SearchResults.module.css';
import Tracklist from '../Tracklist/Tracklist';

function SearchResults() {
  // Mock data for search results
  const mockResults = [
    { id: 1, name: 'Song 1', artist: 'Artist 1', album: 'Album 1' },
    { id: 2, name: 'Song 2', artist: 'Artist 2', album: 'Album 2' }
  ];

  return (
    <div >
      <h2>Results</h2>
      <Tracklist tracks={mockResults} />
    </div>
  );
}

export default SearchResults;