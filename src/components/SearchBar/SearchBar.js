import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './SearchBar.css';

class Searchbar extends Component {
  state = {
    input: '',
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({ input: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (!this.state.input.trim()) {
      return;
    }
    this.props.onSubmit(this.state.input);
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="lable">Search...</span>
          </button>

          <input
            name="input"
            type="text"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.input}
            autoFocus
            placeholder="Search images and photos"
            className="input"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
