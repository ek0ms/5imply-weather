import React from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import SearchBar from './SearchBar';

const Header = (props) => {
  const renderDayLinks = () => {
    if (!props.location.pathname.includes(`/weather/${props.lat},${props.lng}/hourly`)) {
      return <noscript />;
    }

    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return _.map(props.days, (day) => {
      const date = new Date(day.timeInMs);
      const dayOfWeek = week[date.getDay()];
      const dayUrl = `/weather/${props.lat},${props.lng}/hourly/${day.timeInMs}`;
      return (
        <li className="day-link-wrapper" key={day.timeInMs}>
          <NavLink
            className="day-link"
            to={dayUrl}
            activeStyle={{
              fontWeight: 'bold',
              color: 'white',
            }}
          >
            {dayOfWeek}
          </NavLink>
        </li>
      );
    });
  };

  return (
    <div className="header">
      <div className="logo-searchbar-wrapper">
        <a href="/" className="logo">
          5W
        </a>
        <SearchBar searchCity={props.searchCity} lat={props.lat} lng={props.lng} />
      </div>
      <ul className="nav-days">{renderDayLinks()}</ul>
    </div>
  );
};

export default Header;
