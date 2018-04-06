import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Header from './Header';
import HourCardList from './HourCardList';

class ShowHourlyWeather extends Component {
  constructor(props) {
    super(props);

    this.state = { in: true };
  }

  componentWillUnmount() {
    this.setState({ in: false });
  }

  render() {
    const date = new Date(Number(this.props.match.params.id));
    const localeDate = date.toLocaleDateString();

    return (
      <CSSTransition timeout={5000} classNames="fade" in={this.state.in}>
        <div className="show-hourly-weather">
          <Header searchCity={this.props.searchCity} />
          <div className="address">{this.props.address}</div>
          <div className="date">{localeDate}</div>
          <HourCardList {...this.props} />
        </div>
      </CSSTransition>
    );
  }
}

export default ShowHourlyWeather;
