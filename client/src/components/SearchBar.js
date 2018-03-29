import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };
  }

  onInputChange = ({ target }) => {
    const value = target.value;
    this.setState({ value });
  };

  onFormSubmit = (event) => {
    event.preventDefault();
    this.props.searchCity(this.state.value).then(() => this.setState({ value: '' }));
  };

  render() {
    return (
      <form className="searchForm" onSubmit={this.onFormSubmit}>
        <input className="searchField" value={this.state.value} onChange={this.onInputChange} />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default SearchBar;
