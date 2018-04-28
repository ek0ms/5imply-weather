import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route } from 'react-router-dom';
import HourCardList from './HourCardList';

const ShowHourlyWeather = (props) => {
  const date = new Date(Number(props.match.params.id));
  const localeDate = date.toLocaleDateString();

  return (
    <Route
      render={({ location }) => (
        <div className="show-hourly-weather">
          <TransitionGroup>
            <CSSTransition key={location.key} timeout={300} classNames="fade" appear>
              <div className="show-hourly-weather-content">
                <div className="date">{localeDate}</div>
                <HourCardList {...props} />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      )}
    />
  );
};

export default ShowHourlyWeather;
