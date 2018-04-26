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

  onFormSubmit = (event) => {
    event.preventDefault();
    const error = validate(this.state.value);

    if (error) {
      this.setState({ error });
      this.searchField.focus();
    } else {
      this.setState({ isDisabled: true });
      if (this.props.updateLoader) {
        this.props.updateLoader(true);
      }

      this.props.searchCity(this.state.value).then(() => {
        this.setState({ isDisabled: false, error, value: '' });
        if (this.props.updateLoader) {
          this.props.updateLoader(false);
        }

        this.props.history.push(`/weather/${this.props.lat},${this.props.lng}/daily`);
      });
    }
  };

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

function validate(value) {
  let errors = '';

  if (!value) {
    errors = 'Please enter an address';
  }

  return errors;
}
