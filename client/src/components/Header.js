import React from 'react';
import SearchBar from './SearchBar';

const Header = (props) => {
  return (
    <div className="header">
      <a href="/" className="logo">
        <i className="fas fa-sun" />
      </a>
      <SearchBar searchCity={props.searchCity} />
    </div>
  );
};

export default Header;
