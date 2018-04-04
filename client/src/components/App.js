import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import Header from './Header';
import LandingPage from './LandingPage';
import ShowDailyWeather from './ShowDailyWeather';
import ShowHourlyWeather from './ShowHourlyWeather';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      address: '',
      days: {},
      hours: {},
    };
  }
  // componentDidMount() {
  //   fetch('http://localhost:5000/api')
  //     .then((response) => response.json())
  //     .then((json) => console.log(json));
  // }

  // componentDidUpdate() {
  //   debugger;
  // }

  searchCity = async (query) => {
    const uri = encodeURI(query);
    const response = await fetch(`http://localhost:5000/search/${uri}`);
    const json = await response.json();

    this.updateState(json);
  };

  updateState(data) {
    const { address } = data;
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

    this.setState({ address, days, hours });

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
  renderHeader = (routeProps) => <Header {...routeProps} searchCity={this.searchCity} />;

  renderShowDailyWeather = (routeProps) => (
    <ShowDailyWeather {...routeProps} address={this.state.address} days={this.state.days} />
  );

  renderShowHourlyWeather = (routeProps) => {
    if (this.state.address) {
      return (
        <ShowHourlyWeather {...routeProps} address={this.state.address} hours={this.state.hours} />
      );
    }

    return <Redirect to="/" />;
  };

  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage} />
          {/* <Route path="/" render={this.renderHeader} /> */}
          {/* <Route path="/" exact render={this.renderIndexPage} /> */}
          <Route path="/hourly/:id" render={this.renderShowHourlyWeather} />
          <Redirect from="/*" to="/" />
        </Switch>
      </div>
    );
  }
}

export default App;
