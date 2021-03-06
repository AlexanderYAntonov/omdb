import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './Search.scss';

export class Search extends React.Component {
  state = {
    title: '',
    year: '',
    yearIsValid: true
  };

  handleChange = (e) => {
    let { name, value } = e.currentTarget;
    if (name === 'year') {
      value = value.replace(/\D/g, '');
      if (value.length > 4) {
        value = value.slice(0, 4);
      }
      if (value.length === 4) {
        this.setState({ yearIsValid: true });
      }
    }
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { year } = this.state;
    if (year.length === 4 || year === '') {
      this.props.callback(this.state);
    } else {
      this.setState({ yearIsValid: false });
    }
  };

  render() {
    const { title, year, yearIsValid } = this.state;
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
          name="title"
          value={title}
          onChange={this.handleChange}
        />
        <TextField
          error={!yearIsValid}
          name="year"
          className="search__input"
          label="Год"
          variant="outlined"
          value={year}
          helperText={!yearIsValid ? 'Год должен содержать 4 цифры' : ''}
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
