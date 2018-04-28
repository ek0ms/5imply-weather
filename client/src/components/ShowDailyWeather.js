import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route } from 'react-router-dom';
import DayCardList from './DayCardList';

const ShowDailyWeather = (props) => (
  <Route
    render={({ location }) => (
      <div className="show-daily-weather">
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={300} classNames="fade" appear>
            <DayCardList {...props} />
          </CSSTransition>
        </TransitionGroup>
      </div>
    )}
  />
);

export default ShowDailyWeather;
