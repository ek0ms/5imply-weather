import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      isDisabled: false,
      error: '',
    };
  }

  componentDidMount() {
    this.searchField.focus();
  }

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ value });
  };

  onFormSubmit = async (event) => {
    event.preventDefault();
    const error = clientValidate(this.state.value);

    if (error) {
      this.setState({ error });
      this.searchField.focus();
    } else {
      this.startLoader();

      const coords = await this.props.getCoordsFromAddress(this.state.value);

      if (coords === 'ZERO_RESULTS') {
        this.endLoader();
        this.setState({ error: 'No Results' });
        this.searchField.focus();
      } else {
        await this.props.updateWeatherFromCoords(coords);
        this.endLoader();
        this.props.history.push(`/weather/${coords}/daily`);
      }
    }
  };

  startLoader() {
    this.setState({ isDisabled: true });
    if (this.props.isLoading) {
      this.props.isLoading(true);
    }
  }

  endLoader() {
    this.setState({ isDisabled: false, error: '', value: '' });
    if (this.props.isLoading) {
      this.props.isLoading(false);
    }
  }

  render() {
    return (
      <form className="search-form" onSubmit={this.onFormSubmit}>
        <div className="search-container">
          <span className="search-icon">
            <i className="fas fa-search" />
          </span>
          <input
            type="text"
            placeholder="Enter an address"
            className="search-field"
            ref={(input) => (this.searchField = input)}
            value={this.state.value}
            onChange={this.onInputChange}
          />
          <button type="submit" className="btn-search" disabled={this.state.isDisabled}>
            SEARCH
          </button>
        </div>
        <div className="error">{this.state.error}</div>
      </form>
    );
  }
}

export default withRouter(SearchBar);

function clientValidate(value) {
  let error = '';

  if (!value) {
    error = 'Please enter an address';
  }

  return error;
}
