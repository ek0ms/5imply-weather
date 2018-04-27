import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Route } from 'react-router-dom';
import Skycons from 'react-skycons';
import DayCardList from './DayCardList';

class ShowDailyWeather extends Component {
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
    const content = this.state.isLoading ? (
      <div className="loader">
        <Skycons color="white" icon="WIND" />
      </div>
    ) : (
      <DayCardList {...this.props} />
    );

    return (
      <Route
        render={({ location }) => (
          <div className="show-daily-weather">
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

export default ShowDailyWeather;
