import React, { Component } from 'react';
import Skycons from 'react-skycons';
import DayCardList from './DayCardList';

class ShowDailyWeather extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: false };
  }

  componentWillMount() {
    const { coords } = this.props.match.params;
    if (coords !== `${this.props.lat},${this.props.lng}`) {
      this.setState({ isLoading: true });
      this.props.showLoader(true);
      this.props.searchCoords(coords).then(() => {
        this.setState({ isLoading: false });
        this.props.showLoader(false);
      });
    }
  }

  render() {
    const content = this.state.isLoading ? (
      <div className="loader">
        <Skycons color="white" icon="WIND" />
      </div>
    ) : (
      <DayCardList {...this.props} />
    );
    return <div className="show-daily-weather">{content}</div>;
  }
}

export default ShowDailyWeather;
