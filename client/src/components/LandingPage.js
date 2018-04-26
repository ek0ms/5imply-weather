import React, { Component } from 'react';
import Skycons from 'react-skycons';
import SearchBar from './SearchBar';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  updateLoader = (bool) => {
    this.setState({ isLoading: bool });
  };

  renderLoader = () => {
    if (this.state.isLoading) {
      return <Skycons color="white" icon="WIND" />;
    }
    return <noscript />;
  };

  render() {
    return (
      <div className="landing-page">
        <div className="title">
          5<span className="text-light">imply</span> W<span className="text-light">eather</span>
        </div>
        <div className="loader">{this.renderLoader()}</div>
        <SearchBar
          searchCity={this.props.searchCity}
          updateLoader={this.updateLoader}
          lat={this.props.lat}
          lng={this.props.lng}
        />
      </div>
    );
  }
}

export default LandingPage;
