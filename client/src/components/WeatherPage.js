import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from './Header';
import Address from './Address';
import ShowDailyWeather from './ShowDailyWeather';
import ShowHourlyWeather from './ShowHourlyWeather';

class WeatherPage extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false };
  }

  showLoader = (bool) => {
    this.setState({ isLoading: bool });
  };

  componentDidUpdate(prevProps) {
    const { coords } = this.props.match.params;
    const prevCoords = prevProps.match.params.coords;

    if (coords !== prevCoords) {
      this.setState({ isLoading: true });
      this.showLoader(true);
      this.props.searchCoords(coords).then(() => {
        this.setState({ isLoading: false });
        this.showLoader(false);
      });
    }
  }

  renderShowDailyWeather = (routeProps) => {
    if (this.props.address) {
      return (
        <ShowDailyWeather
          {...routeProps}
          lat={this.props.lat}
          lng={this.props.lng}
          days={this.props.days}
          searchCoords={this.props.searchCoords}
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
          searchCoords={this.props.searchCoords}
          showLoader={this.showLoader}
        />
      );
    }

    return <Redirect to="/" />;
  };

  render() {
    return (
      <Route
        render={({ location }) => (
          <div className="weather-page">
            <Header
              searchAddress={this.props.searchAddress}
              lat={this.props.lat}
              lng={this.props.lng}
              days={this.props.days}
              location={location}
            />
            <Address address={this.state.isLoading ? 'Loading..' : this.props.address} />
            <Switch>
              <Route
                path={`${this.props.match.path}/hourly/:id`}
                render={this.renderShowHourlyWeather}
              />
              <Route path={`${this.props.match.path}/daily`} render={this.renderShowDailyWeather} />
            </Switch>
          </div>
        )}
      />
    );
  }
}

export default withRouter(WeatherPage);
