import React, { Component } from 'react';
import HourCard from './HourCard';

class HourCardList extends Component {
  getWeatherForNext24Hours(dayInMs) {
    const { hours } = this.props;
    const weatherForNext24Hours = [];
    let weatherForCurrentHour = Number(dayInMs);

    if (!hours[weatherForCurrentHour]) {
      while (!hours[weatherForCurrentHour]) {
        weatherForCurrentHour += 3600000;
      }
    }

    for (let currentHour = 0; currentHour < 24; currentHour += 1) {
      weatherForNext24Hours.push(hours[weatherForCurrentHour]);
      weatherForCurrentHour += 3600000;
    }

    return weatherForNext24Hours;
  }

  renderWeatherForNext24Hours(weatherForNext24Hours) {
    return weatherForNext24Hours.map((hour) => (
      <HourCard icon={hour.icon} temp={hour.roundedTemp} time={hour.timeInMs} key={hour.timeInMs} />
    ));
  }

  render() {
    const dayInMs = this.props.match.params.id;
    const weatherForNext24Hours = this.getWeatherForNext24Hours(dayInMs);

    return (
      <ul className="hour-card-list">{this.renderWeatherForNext24Hours(weatherForNext24Hours)}</ul>
    );
  }
}
export default HourCardList;
