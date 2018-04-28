/* eslint no-shadow: 0 */
import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import WeatherPage from './WeatherPage';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      days: {},
      hours: {},
      lat: '',
      lng: '',
    };
  }

  getCoordsFromAddress = async (query) => {
    const uri = encodeURI(query);
    const response = await fetch(`http://localhost:5000/address/${uri}`);
    const json = await response.json();

    if (json.error) {
      return json.error;
    }

    return `${json.lat},${json.lng}`;
  };

  updateWeatherFromCoords = async (coords) => {
    const response = await fetch(`http://localhost:5000/coordinates/${coords}`);
    const json = await response.json();

    this.updateState(json);
  };

  updateState(data) {
    const { address, latitude: lat, longitude: lng } = data;
    const daysOfTheWeek = data.daily.data;
    const hoursOfTheWeek = data.hourly.data;
    const days = getWeatherOfNext5Days(daysOfTheWeek);
    const hours = getWeatherOfNext144Hours(hoursOfTheWeek);

    function getWeatherOfNext5Days(daysOfTheWeek) {
      let weatherOfNext5Days = {};

      for (let dayIndex = 0; dayIndex < 5; dayIndex += 1) {
        const day = daysOfTheWeek[dayIndex];
        const weather = setWeatherForDay(day);

        weatherOfNext5Days = {
          ...weatherOfNext5Days,
          [weather.timeInMs]: { ...weather },
        };
      }

      return weatherOfNext5Days;
    }

    function getWeatherOfNext144Hours(hoursOfTheWeek) {
      let weatherForNext144Hours = {};

      for (let hoursIndex = 0; hoursIndex < 144; hoursIndex += 1) {
        const hour = hoursOfTheWeek[hoursIndex];
        const weather = setWeatherForHour(hour);

        weatherForNext144Hours = { ...weatherForNext144Hours, [weather.timeInMs]: { ...weather } };
      }

      return weatherForNext144Hours;
    }

    this.setState({
      address,
      days,
      hours,
      lat,
      lng,
    });

    // HELPER FUNCTIONS //
    function setWeatherForDay(day) {
      const { icon } = day;
      const timeInMs = day.time * 1000;
      const roundedHighTemp = Math.round(day.temperatureHigh);
      const roundedLowTemp = Math.round(day.temperatureLow);

      return {
        icon,
        roundedHighTemp,
        roundedLowTemp,
        timeInMs,
      };
    }

    function setWeatherForHour(hour) {
      const { icon } = hour;
      const timeInMs = hour.time * 1000;
      const roundedTemp = Math.round(hour.temperature);

      return { roundedTemp, icon, timeInMs };
    }
  }

  // RENDER FUNCTIONS //
  renderLandingPage = (routeProps) => (
    <LandingPage
      {...routeProps}
      getCoordsFromAddress={this.getCoordsFromAddress}
      updateWeatherFromCoords={this.updateWeatherFromCoords}
    />
  );

  renderWeatherPage = (routeProps) => {
    if (this.state.address) {
      return (
        <WeatherPage
          {...routeProps}
          {...this.state}
          getCoordsFromAddress={this.getCoordsFromAddress}
          updateWeatherFromCoords={this.updateWeatherFromCoords}
        />
      );
    }

    return <Redirect to="/" />;
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact render={this.renderLandingPage} />
          <Route path="/weather/:coords" render={this.renderWeatherPage} />
          <Redirect to="/" />
        </Switch>
        <Route path="/" component={Footer} />
      </div>
    );
  }
}

export default App;
