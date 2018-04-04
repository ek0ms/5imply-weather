import React from 'react';
import icons from '../icons/icons';

const HourCard = (props) => {
  const date = new Date(props.time);
  const localeTime = date.toLocaleTimeString().replace(':00:00', '');
  const iconSrc = icons[`./${props.icon}.svg`];
  const alt = props.icon.replace('-', ' ');

  return (
    <li className="hour-card">
      <div className="time">{localeTime}</div>
      <img className="icon" src={iconSrc} alt={alt} />
      <div className="temp">{props.temp}&deg;</div>
    </li>
  );
};

export default HourCard;
