import React, { Component } from 'react';
import Header from './Header';

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

      for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
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

      for (let hoursIndex = 0; hoursIndex < 144; hoursIndex++) {
        const hour = hoursOfTheWeek[hoursIndex];
        const weather = setWeatherForHour(hour);

        weatherForNext144Hours = { ...weatherForNext144Hours, [weather.timeInMs]: { ...weather } };
      }

      return weatherForNext144Hours;
    }

    function setWeatherForDay(day) {
      const { icon, temperatureHigh, temperatureLow } = day;
      const timeInMs = day.time * 1000;

      return { icon, temperatureLow, temperatureHigh, timeInMs };
    }

    function setWeatherForHour(hour) {
      const { temperature, icon } = hour;
      const timeInMs = hour.time * 1000;

      return { temperature, icon, timeInMs };
    }

    this.setState({ address, days, hours });
  }

  render() {
    return (
      <div className="App">
        <Header searchCity={this.searchCity} />
      </div>
    );
  }
}

export default App;
