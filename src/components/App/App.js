import React from 'react';
import styles from './App.module.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  return (
    <div >
      <h1>Jammming</h1>
      <SearchBar />
      <div className={styles.resultsAndPlaylist}>
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App;