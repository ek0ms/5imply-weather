import React from 'react';

const week = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'];
const iconSvgs = require.context('../icons', false, /\.svg$/);
const iconFilePaths = iconSvgs.keys();
const iconFilePathsMappedToSrc = iconFilePaths.reduce((icons, filePath) => {
  icons[filePath] = iconSvgs(filePath);
  return icons;
}, {});

const DayCard = (props) => {
  const date = new Date(props.time);
  const dayOfWeek = week[date.getDay()];
  const iconSrc = iconFilePathsMappedToSrc[`./${props.icon}.svg`];
  const alt = props.icon.replace('-', ' ');

  return (
    <li className="day-card">
      <div className="day-of-week">{dayOfWeek}</div>
      <img src={iconSrc} alt={alt} />
      <div className="temps">
        <span className="temp-high">{props.high}&deg;</span>
        <span className="temp-low">{props.low}&deg;</span>
      </div>
    </li>
  );
};

export default DayCard;
