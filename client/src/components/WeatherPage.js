import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
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
              searchCity={this.props.searchCity}
              lat={this.props.lat}
              lng={this.props.lng}
              days={this.props.days}
              location={location}
            />
            <Address address={this.state.isLoading ? 'Loading..' : this.props.address} />
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={300} classNames="fade" appear>
                <Switch location={location}>
                  <Route
                    path={`${this.props.match.path}/hourly/:id`}
                    render={this.renderShowHourlyWeather}
                  />
                  <Route
                    path={`${this.props.match.path}/daily`}
                    render={this.renderShowDailyWeather}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          </div>
        )}
      />
    );
  }
}

export default withRouter(WeatherPage);
