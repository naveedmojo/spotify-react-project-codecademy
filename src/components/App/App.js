import React, { useState } from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  const [playList,setPlayList]=useState([
    { id: 3, name: 'Song 3', artist: 'Artist 3', album: 'Album 3' }
  ])
  return (
    <div>
      <h1 className='center'>Jammming</h1>
      <SearchBar />
      <div className={styles.resultsAndPlaylist}>
        <div className={styles.searchResultsContainer}>
          <SearchResults  setplaylist={setPlayList} />
        </div>
        <div className={styles.playlistContainer}>
          <Playlist playlist={playList} />
        </div>
      </div>
    </div>
  );
}

export default App;
