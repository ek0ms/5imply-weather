import React, { Component } from 'react';
// import { CSSTransition } from 'react-transition-group';
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
      // <CSSTransition
      //   timeout={500}
      //   classNames="fade-in-slide-out"
      //   in={this.state.in}
      //   appear={this.state.in}
      //   unmountOnExit
      //   mountOnEnter
      //   onExited={() => console.log('exited')}
      // >
      <div className="landing-page">
        <div className="title">
          5<span className="text-light">imply</span> W<span className="text-light">eather</span>
        </div>
        <div className="loader">{this.renderLoader()}</div>
        <SearchBar searchCity={this.props.searchCity} updateLoader={this.updateLoader} />
      </div>
      // </CSSTransition>
    );
  }
}

export default LandingPage;
