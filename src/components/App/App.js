import React, { useState } from 'react';
import styles from './App.module.css';

import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
  const [playList,setPlayList]=useState([
  ])
  return (
    <div>
      <h1 className='center'>Jammming</h1>
    
      <div className={styles.resultsAndPlaylist}>
        <div className={styles.searchResultsContainer}>
          <SearchResults  setplaylist={setPlayList} />
        </div>
        <div className={styles.playlistContainer}>
          <Playlist playlist={playList} setplaylist={setPlayList} />
        </div>
      </div>
    </div>
  );
}

export default App;
