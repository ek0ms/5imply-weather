import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Header from './Header';
import DayCardList from './DayCardList';

class ShowDailyWeather extends Component {
  constructor(props) {
    super(props);

    this.state = { in: true };
  }

  componentWillUnmount() {
    this.setState = { in: false };
  }

  render() {
    return (
      <CSSTransition timeout={500} classNames="slide-in" in={this.state.in}>
        <div className="show-daily-weather">
          <Header searchCity={this.props.searchCity} />
          <div className="address">{this.props.address}</div>
          <DayCardList {...this.props} />
        </div>
      </CSSTransition>
    );
  }
}

export default ShowDailyWeather;
