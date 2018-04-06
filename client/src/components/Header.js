import React from 'react';
import { NavLink } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import SearchBar from './SearchBar';

const Header = (props) => (
  <div className="header">
    <CSSTransition classNames="fade" timeout={500} in={true}>
      <a href="/" className="logo">
        5W
      </a>
    </CSSTransition>
    <SearchBar searchCity={props.searchCity} />
    {/* <ul className="nav-days">
      <NavLink to="">TestDay</NavLink>
      <NavLink to="">TestDay</NavLink>
      <NavLink to="">TestDay</NavLink>
      <NavLink to="">TestDay</NavLink>
      <NavLink to="">TestDay</NavLink>
    </ul> */}
  </div>
);

export default Header;
