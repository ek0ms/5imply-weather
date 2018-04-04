import React, { Component } from 'react';

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
    this.setState({ isDisabled: true });
    const error = validate(this.state.value);

    if (error) {
      this.setState({ error, isDisabled: false });
    } else {
      this.props
        .searchCity(this.state.value)
        .then(() => this.setState({ value: '', isDisabled: false, error }));
    }
    this.searchField.focus();
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

export default SearchBar;

function validate(value) {
  let errors = '';

  if (!value) {
    errors = 'Please enter an address';
  }

  return errors;
}
