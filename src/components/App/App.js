import React from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  return (
    <div>
      <h1 className='center'>Jammming</h1>
      <SearchBar />
      <div className={styles.resultsAndPlaylist}>
        <div className={styles.searchResultsContainer}>
          <SearchResults />
        </div>
        <div className={styles.playlistContainer}>
          <Playlist />
        </div>
      </div>
    </div>
  );
}

export default App;
