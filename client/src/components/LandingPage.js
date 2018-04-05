import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';
import Skycons from 'react-skycons';
import SearchBar from './SearchBar';

class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      in: true,
    };
  }

  componentWillUnmount() {
    this.setState({ in: false });
  }

  updateLoader = (bool) => {
    this.setState({ isLoading: bool });
  };

  renderLoader = () => {
    if (this.state.isLoading) {
      return <Skycons color="white" icon="WIND" />;
    }
  };

  render() {
    return (
      <CSSTransition timeout={500} classNames="slide" in={this.state.in} appear={this.state.in}>
        <div className="landing-page">
          <div className="title">5imply Weather</div>
          <div className="loader">{this.renderLoader()}</div>
          <SearchBar searchCity={this.props.searchCity} updateLoader={this.updateLoader} />
        </div>
      </CSSTransition>
    );
  }
}

export default LandingPage;
