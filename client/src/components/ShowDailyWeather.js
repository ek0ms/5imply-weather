import React from 'react';
import DayCardList from './DayCardList';

const ShowDailyWeather = (props) => (
  <div className="show-daily-weather">
    <div className="address">{props.address}</div>
    <DayCardList {...props} />
  </div>
);

export default ShowDailyWeather;
