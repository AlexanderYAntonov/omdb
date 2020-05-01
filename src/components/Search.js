import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './Search.scss';

export class Search extends React.Component {
  state = {
    title: '',
    year: ''
  };

  handleChange = (e) => {
    const { id, value } = e.currentTarget;
    console.log(id, value);
    this.setState({ [id]: value });
    // this.setState({ value: event.target.value });
  };

  handleSubmit = (e) => {
    console.log('submit');
    this.props.callback(this.state);
    // this.setState({ value: event.target.value });
  };

  render() {
    const { title, year } = this.state;
    return (
      <form
        autoComplete="off"
        className="search__form"
        onSubmit={this.handleSubmit}
      >
        <TextField
          required
          className="search__input"
          label="Название"
          variant="outlined"
          id="title"
          value={title}
          onChange={this.handleChange}
        />
        <TextField
          id="year"
          className="search__input"
          label="Год"
          variant="outlined"
          value={year}
          onChange={this.handleChange}
        />
        <Button
          variant="contained"
          className="search__btn"
          color="primary"
          type="submit"
        >
          Искать
        </Button>
      </form>
    );
  }
}

Search.propTypes = {
  callback: PropTypes.func.isRequired
};
