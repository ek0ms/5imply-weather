import React from 'react';
// import { CSSTransition } from 'react-transition-group';
import Header from './Header';
import HourCardList from './HourCardList';

const ShowHourlyWeather = (props) => {
  const date = new Date(Number(props.match.params.id));
  const localeDate = date.toLocaleDateString();

  return (
    // <CSSTransition timeout={500} classNames="fade" in={this.state.in}>
    <div className="show-hourly-weather">
      <Header searchCity={props.searchCity} days={props.days} />
      <div className="address">{props.address}</div>
      <div className="date">{localeDate}</div>
      <HourCardList {...props} />
    </div>
    // </CSSTransition>
  );
};

export default ShowHourlyWeather;
