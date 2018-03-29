import React from 'react';
import SearchBar from './SearchBar';

const Header = (props) => {
  return (
    <div className="header">
      <a href="#" className="logo">
        Logo
      </a>
      <SearchBar searchCity={props.searchCity} />
    </div>
  );
};

export default Header;
