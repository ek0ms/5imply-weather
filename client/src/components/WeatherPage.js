import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Skycons from 'react-skycons';
import Header from './Header';
import Address from './Address';
import ShowDailyWeather from './ShowDailyWeather';
import ShowHourlyWeather from './ShowHourlyWeather';

class WeatherPage extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false };
  }

  componentDidUpdate(prevProps) {
    const { coords } = this.props.match.params;
    const prevCoords = prevProps.match.params.coords;

    if (coords !== prevCoords) {
      this.showLoader(true);
      this.props.updateWeatherFromCoords(coords).then(() => {
        this.showLoader(false);
      });
    }
  }

  showLoader(bool) {
    this.setState({ isLoading: bool });
  }

  renderShowDailyWeather = (routeProps) => {
    if (this.props.address) {
      return (
        <ShowDailyWeather
          {...routeProps}
          lat={this.props.lat}
          lng={this.props.lng}
          days={this.props.days}
          updateWeatherFromCoords={this.props.updateWeatherFromCoords}
          showLoader={this.showLoader}
        />
      );
    }

    return <Redirect to="/" />;
  };

  renderShowHourlyWeather = (routeProps) => {
    if (this.props.address) {
      return (
        <ShowHourlyWeather
          {...routeProps}
          hours={this.props.hours}
          lat={this.props.lat}
          lng={this.props.lng}
          updateWeatherFromCoords={this.props.updateWeatherFromCoords}
          showLoader={this.showLoader}
        />
      );
    }

    return <Redirect to="/" />;
  };

  render() {
    const weather = this.state.isLoading ? (
      <div className="loader">
        <Skycons color="white" icon="WIND" />
      </div>
    ) : (
      <Switch>
        <Route path={`${this.props.match.path}/hourly/:id`} render={this.renderShowHourlyWeather} />
        <Route path={`${this.props.match.path}/daily`} render={this.renderShowDailyWeather} />
      </Switch>
    );
    return (
      <Route
        render={({ location }) => (
          <div className="weather-page">
            <Header
              getCoordsFromAddress={this.props.getCoordsFromAddress}
              updateWeatherFromCoords={this.props.updateWeatherFromCoords}
              lat={this.props.lat}
              lng={this.props.lng}
              days={this.props.days}
              location={location}
            />
            <Address address={this.state.isLoading ? 'Loading ...' : this.props.address} />
            {weather}
          </div>
        )}
      />
    );
  }
}

export default withRouter(WeatherPage);
