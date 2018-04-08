import React from 'react';
import { CSSTransition } from 'react-transition-group';
import Header from './Header';
import DayCardList from './DayCardList';

const ShowDailyWeather = (props) => (
  // <CSSTransition timeout={500} classNames="slide-in" in={this.state.in}>
  <div className="show-daily-weather">
    <Header searchCity={props.searchCity} />
    <div className="address">{props.address}</div>
    <DayCardList {...props} />
  </div>
  // </CSSTransition>
);

export default ShowDailyWeather;
