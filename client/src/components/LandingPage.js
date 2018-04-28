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

  isLoading = (bool) => {
    this.setState({ isLoading: bool });
  };

  render() {
    const loader = this.state.isLoading ? <Skycons color="white" icon="WIND" /> : <noscript />;
    return (
      <div className="landing-page">
        <div className="title">
          5<span className="text-light">imply</span> W<span className="text-light">eather</span>
        </div>
        <div className="loader">{loader}</div>
        <SearchBar
          getCoordsFromAddress={this.props.getCoordsFromAddress}
          updateWeatherFromCoords={this.props.updateWeatherFromCoords}
          isLoading={this.isLoading}
        />
      </div>
    );
  }
}

export default LandingPage;
