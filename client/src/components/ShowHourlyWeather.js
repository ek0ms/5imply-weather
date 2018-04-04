import React from 'react';
import HourCardList from './HourCardList';

const ShowHourlyWeather = (props) => {
  const date = new Date(Number(props.match.params.id));
  const localeDate = date.toLocaleDateString();
  return (
    <div className="show-hourly-weather">
      <div className="address">{props.address}</div>
      <div className="date">{localeDate}</div>
      <HourCardList {...props} />
    </div>
  );
};

export default ShowHourlyWeather;
