import React from 'react';
import styles from './SearchBar.module.css';

function SearchBar() {
  return (
    <div >
      <input type="text" placeholder="Enter A Song, Album, or Artist" />
      <button>Search</button>
    </div>
  );
}

export default SearchBar;