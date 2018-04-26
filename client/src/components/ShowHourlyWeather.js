import React, { Component } from 'react';
import Skycons from 'react-skycons';
import HourCardList from './HourCardList';

class ShowHourlyWeather extends Component {
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
    const date = new Date(Number(this.props.match.params.id));
    const localeDate = date.toLocaleDateString();
    const content = this.state.isLoading ? (
      <div className="loader">
        <Skycons color="white" icon="WIND" />
      </div>
    ) : (
      <div>
        <div className="date">{localeDate}</div>
        <HourCardList {...this.props} />
      </div>
    );

    return <div className="show-hourly-weather">{content}</div>;
  }
}

export default ShowHourlyWeather;
