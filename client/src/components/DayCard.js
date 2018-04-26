import React from 'react';
import { Link } from 'react-router-dom';
import icons from '../icons/icons';

const week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];

const DayCard = (props) => {
  const date = new Date(props.time);
  const dayOfWeek = week[date.getDay()];
  const iconSrc = icons[`./${props.icon}.svg`];
  const alt = props.icon.replace('-', ' ');

  return (
    <li className="day-card">
      <Link to={`hourly/${props.time}`} className="day-card-link">
        <div className="day-of-week">{dayOfWeek}</div>
        <img src={iconSrc} alt={alt} className="icon" />
        <div className="temps">
          <span className="temp-high">{props.high}&deg;</span>
          <span className="temp-low">{props.low}&deg;</span>
        </div>
      </Link>
    </li>
  );
};

export default DayCard;
