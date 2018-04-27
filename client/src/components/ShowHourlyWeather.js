import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route } from 'react-router-dom';
import Skycons from 'react-skycons';
import HourCardList from './HourCardList';

class ShowHourlyWeather extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false };
  }

  // componentWillMount() {
  //   const { coords } = this.props.match.params;
  //   if (coords !== `${this.props.lat},${this.props.lng}`) {
  //     this.setState({ isLoading: true });
  //     this.props.showLoader(true);
  //     this.props.searchCoords(coords).then(() => {
  //       this.setState({ isLoading: false });
  //       this.props.showLoader(false);
  //     });
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   const { coords } = this.props.match.params;
  //   const prevCoords = prevProps.match.params.coords;
  //
  //   if (coords !== prevCoords) {
  //     this.setState({ isLoading: true });
  //     this.props.showLoader(true);
  //     this.props.searchCoords(coords).then(() => {
  //       this.setState({ isLoading: false });
  //       this.props.showLoader(false);
  //     });
  //   }
  // }

  render() {
    const date = new Date(Number(this.props.match.params.id));
    const localeDate = date.toLocaleDateString();
    const content = this.state.isLoading ? (
      <div className="loader">
        <Skycons color="white" icon="WIND" />
      </div>
    ) : (
      <div className="show-hourly-weather-content">
        <div className="date">{localeDate}</div>
        <HourCardList {...this.props} />
      </div>
    );

    return (
      <Route
        render={({ location }) => (
          <div className="show-hourly-weather">
            <TransitionGroup>
              <CSSTransition key={location.key} timeout={300} classNames="fade" appear>
                {content}
              </CSSTransition>
            </TransitionGroup>
          </div>
        )}
      />
    );
  }
}

export default ShowHourlyWeather;
